import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Maps friendly field labels to actual DB columns per tipo
const labelToColumn: Record<string, Record<string, string>> = {
  transfer: {
    "Tipo de Viagem": "tipo",
    "Nome do Cliente": "nome_cliente",
    "Telefone do Cliente": "contato",
    "E-mail do Cliente": "_email",
    "Origem / Como encontrou": "_origem",
    "Passageiros (Ida)": "num_passageiros",
    "Embarque (Ida)": "embarque",
    "Destino (Ida)": "desembarque",
    "Data (Ida)": "data_viagem",
    "Hora (Ida)": "_hora_ida",
    "Mensagem (Ida)": "mensagem",
    "Cupom (Ida)": "_cupom_ida",
    "Passageiros (Volta)": "_passageiros_volta",
    "Embarque (Volta)": "_embarque_volta",
    "Destino (Volta)": "_destino_volta",
    "Data (Volta)": "_data_volta",
    "Hora (Volta)": "_hora_volta",
    "Mensagem (Volta)": "_mensagem_volta",
    "Cupom (Volta)": "_cupom_volta",
    "Passageiros": "num_passageiros",
    "Endereço de Início": "embarque",
    "Data": "data_viagem",
    "Hora": "_hora",
    "Qtd. Horas": "_qtd_horas",
    "Ponto de Encerramento": "desembarque",
    "Itinerário / Mensagem": "mensagem",
    "Cupom": "_cupom",
  },
  grupo: {
    "Tipo de Veículo": "tipo_veiculo",
    "Número de Passageiros": "num_passageiros",
    "Endereço de Embarque": "embarque",
    "Destino": "destino",
    "Data de Ida": "data_ida",
    "Hora de Ida": "_hora_ida",
    "Data de Retorno": "_data_retorno",
    "Hora de Retorno": "_hora_retorno",
    "Observações": "mensagem",
    "Cupom de Desconto": "_cupom",
    "Nome do Cliente": "nome_cliente",
    "E-mail do Cliente": "_email",
    "WhatsApp do Cliente": "whatsapp",
    "Como nos encontrou": "_origem",
  },
  motorista: {
    "Nome Completo": "nome",
    "E-mail": "email",
    "Telefone / WhatsApp": "telefone",
    "CPF": "cpf",
    "Data de Nascimento": "_data_nascimento",
    "Endereço Completo": "_endereco",
    "Cidade": "cidade",
    "Estado": "_estado",
    "Número da CNH": "cnh",
    "Categoria da CNH": "_categoria_cnh",
    "Possui Veículo (sim/não)": "_possui_veiculo",
    "Marca do Veículo": "_marca_veiculo",
    "Modelo do Veículo": "_modelo_veiculo",
    "Ano do Veículo": "_ano_veiculo",
    "Placa do Veículo": "_placa_veiculo",
    "Experiência": "_experiencia",
    "Mensagem / Observações": "mensagem",
  },
};

// Resolve nested value from object using dot notation
function resolveValue(obj: Record<string, any>, path: string): any {
  if (!path) return undefined;
  const parts = path.split(".");
  let current: any = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const automacaoId = url.searchParams.get("automacao_id");

    if (!automacaoId) {
      return new Response(
        JSON.stringify({ error: "automacao_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: automacao, error: autoError } = await supabase
      .from("automacoes")
      .select("*")
      .eq("id", automacaoId)
      .single();

    if (autoError || !automacao) {
      return new Response(
        JSON.stringify({ error: "Automação não encontrada" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!automacao.ativo) {
      return new Response(
        JSON.stringify({ error: "Automação desativada", received: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const tipo = automacao.tipo as string;
    const userId = automacao.user_id;
    const savedMappings = (automacao.mappings || {}) as Record<string, Record<string, string>>;
    const columnMap = labelToColumn[tipo] || {};

    // Collect all mapping tabs into one flat map: dbColumn -> resolved value
    const resolvedData: Record<string, any> = {};

    // Iterate all tabs in mappings (e.g., "default", "somente_ida", "ida_volta", "por_hora")
    for (const tabKey of Object.keys(savedMappings)) {
      const tabMappings = savedMappings[tabKey];
      if (!tabMappings || typeof tabMappings !== "object") continue;

      for (const [friendlyLabel, incomingPath] of Object.entries(tabMappings)) {
        if (!incomingPath) continue;
        const dbColumn = columnMap[friendlyLabel];
        if (!dbColumn || dbColumn.startsWith("_")) continue; // skip unmapped or extra fields

        const value = resolveValue(body, incomingPath);
        if (value !== undefined && value !== null && value !== "") {
          // Don't overwrite if already set (first match wins)
          if (!resolvedData[dbColumn]) {
            resolvedData[dbColumn] = value;
          }
        }
      }
    }

    let insertError;

    if (tipo === "transfer") {
      const record: Record<string, any> = {
        user_id: userId,
        nome_cliente: resolvedData.nome_cliente || body.nome_completo || body.nome || "Sem nome",
        contato: resolvedData.contato || body.telefone || body.whatsapp || null,
        tipo: resolvedData.tipo || body.tipo_viagem || null,
        embarque: resolvedData.embarque || body.embarque_ida || body.endereco_inicio || null,
        desembarque: resolvedData.desembarque || body.destino_ida || body.ponto_encerramento || null,
        data_viagem: resolvedData.data_viagem || body.data_ida || body.data || null,
        num_passageiros: resolvedData.num_passageiros
          ? parseInt(String(resolvedData.num_passageiros))
          : (body.passageiros_ida ? parseInt(body.passageiros_ida) : null),
        mensagem: resolvedData.mensagem || body.mensagem_ida || body.mensagem || null,
        status: "pendente",
      };
      const { error } = await supabase.from("solicitacoes_transfer").insert(record);
      insertError = error;
    } else if (tipo === "grupo") {
      const record: Record<string, any> = {
        user_id: userId,
        nome_cliente: resolvedData.nome_cliente || body.nome_completo || body.nome || "Sem nome",
        whatsapp: resolvedData.whatsapp || body.telefone || body.whatsapp || null,
        tipo_veiculo: resolvedData.tipo_veiculo || body.tipo_veiculo || null,
        embarque: resolvedData.embarque || body.embarque || null,
        destino: resolvedData.destino || body.destino || null,
        data_ida: resolvedData.data_ida || body.data_ida || null,
        num_passageiros: resolvedData.num_passageiros
          ? parseInt(String(resolvedData.num_passageiros))
          : (body.num_passageiros ? parseInt(body.num_passageiros) : null),
        mensagem: resolvedData.mensagem || body.observacoes || body.mensagem || null,
        status: "pendente",
      };
      const { error } = await supabase.from("solicitacoes_grupos").insert(record);
      insertError = error;
    } else if (tipo === "motorista") {
      const record: Record<string, any> = {
        user_id: userId,
        nome: resolvedData.nome || body.nome_completo || body.nome || "Sem nome",
        email: resolvedData.email || body.email || null,
        telefone: resolvedData.telefone || body.telefone || body.whatsapp || null,
        cpf: resolvedData.cpf || body.cpf || null,
        cnh: resolvedData.cnh || body.numero_cnh || null,
        cidade: resolvedData.cidade || body.cidade || null,
        mensagem: resolvedData.mensagem || body.mensagem_observacoes || body.mensagem || null,
        status: "pendente",
      };
      const { error } = await supabase.from("solicitacoes_motoristas").insert(record);
      insertError = error;
    } else {
      return new Response(
        JSON.stringify({ error: "Tipo de automação inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar solicitação", details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Solicitação recebida com sucesso" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
