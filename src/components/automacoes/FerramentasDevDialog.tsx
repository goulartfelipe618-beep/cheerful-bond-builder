import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code2, Copy, FileText } from "lucide-react";
import { toast } from "sonner";

interface FerramentasDevDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipo: string;
  onSubmit: (payload: Record<string, string>) => void;
}

interface FieldDoc {
  variable: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

const personalFields: FieldDoc[] = [
  { variable: "nome_completo", label: "Nome Completo", type: "text", required: true },
  { variable: "telefone", label: "Número de Telefone", type: "text", required: true },
  { variable: "email", label: "E-mail", type: "email", required: true },
  { variable: "como_encontrou", label: "Por onde nos encontrou?", type: "select", options: ["Google", "Instagram", "Facebook", "Indicação", "Outro"] },
];

const transferIdaDocs: FieldDoc[] = [
  { variable: "tipo_viagem", label: "Tipo de Viagem", type: "select", required: true, options: ["Somente Ida", "Ida e Volta", "Por Hora"] },
  { variable: "passageiros_ida", label: "Passageiros (Ida)", type: "number", required: true },
  { variable: "embarque_ida", label: "Embarque (Ida)", type: "text", required: true },
  { variable: "destino_ida", label: "Destino (Ida)", type: "text", required: true },
  { variable: "data_ida", label: "Data (Ida)", type: "date", required: true },
  { variable: "hora_ida", label: "Hora (Ida)", type: "time", required: true },
  { variable: "mensagem_ida", label: "Mensagem (Ida)", type: "textarea" },
  { variable: "cupom_ida", label: "Cupom (Ida)", type: "text" },
];

const transferVoltaDocs: FieldDoc[] = [
  { variable: "passageiros_volta", label: "Passageiros (Volta)", type: "number", required: true },
  { variable: "embarque_volta", label: "Embarque (Volta)", type: "text", required: true },
  { variable: "destino_volta", label: "Destino (Volta)", type: "text", required: true },
  { variable: "data_volta", label: "Data (Volta)", type: "date", required: true },
  { variable: "hora_volta", label: "Hora (Volta)", type: "time", required: true },
  { variable: "mensagem_volta", label: "Mensagem (Volta)", type: "textarea" },
  { variable: "cupom_volta", label: "Cupom (Volta)", type: "text" },
];

const transferPorHoraDocs: FieldDoc[] = [
  { variable: "tipo_viagem", label: "Tipo de Viagem", type: "select", required: true, options: ["Somente Ida", "Ida e Volta", "Por Hora"] },
  { variable: "passageiros", label: "Passageiros", type: "number", required: true },
  { variable: "endereco_inicio", label: "Endereço de Início", type: "text", required: true },
  { variable: "data", label: "Data", type: "date", required: true },
  { variable: "hora", label: "Hora", type: "time", required: true },
  { variable: "qtd_horas", label: "Qtd. Horas", type: "number", required: true },
  { variable: "ponto_encerramento", label: "Ponto de Encerramento", type: "text" },
  { variable: "itinerario_mensagem", label: "Itinerário / Mensagem", type: "textarea" },
  { variable: "cupom", label: "Cupom", type: "text" },
];

const grupoDocs: FieldDoc[] = [
  { variable: "tipo_veiculo", label: "Tipo de Veículo", type: "select", required: true, options: ["Van", "Micro-ônibus", "Ônibus"] },
  { variable: "num_passageiros", label: "Número de Passageiros", type: "number", required: true },
  { variable: "embarque", label: "Endereço de Embarque", type: "text", required: true },
  { variable: "destino", label: "Destino", type: "text", required: true },
  { variable: "data_ida", label: "Data de Ida", type: "date", required: true },
  { variable: "hora_ida", label: "Hora de Ida", type: "time", required: true },
  { variable: "data_retorno", label: "Data de Retorno", type: "date" },
  { variable: "hora_retorno", label: "Hora de Retorno", type: "time" },
  { variable: "observacoes", label: "Observações", type: "textarea" },
  { variable: "cupom_desconto", label: "Cupom de Desconto", type: "text" },
];

const motoristaDocs: FieldDoc[] = [
  { variable: "cpf", label: "CPF", type: "text", required: true },
  { variable: "data_nascimento", label: "Data de Nascimento", type: "date", required: true },
  { variable: "endereco_completo", label: "Endereço Completo", type: "text", required: true },
  { variable: "cidade", label: "Cidade", type: "text", required: true },
  { variable: "estado", label: "Estado", type: "text", required: true },
  { variable: "numero_cnh", label: "Número da CNH", type: "text", required: true },
  { variable: "categoria_cnh", label: "Categoria da CNH", type: "select", required: true, options: ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"] },
  { variable: "possui_veiculo", label: "Possui Veículo", type: "select", options: ["Sim", "Não"] },
  { variable: "marca_veiculo", label: "Marca do Veículo", type: "text" },
  { variable: "modelo_veiculo", label: "Modelo do Veículo", type: "text" },
  { variable: "ano_veiculo", label: "Ano do Veículo", type: "text" },
  { variable: "placa_veiculo", label: "Placa do Veículo", type: "text" },
  { variable: "experiencia", label: "Experiência", type: "textarea" },
  { variable: "mensagem_observacoes", label: "Mensagem / Observações", type: "textarea" },
];

function FieldTable({ fields, sectionTitle }: { fields: FieldDoc[]; sectionTitle: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground border-b border-border pb-1">{sectionTitle}</h4>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Variável</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Campo</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Tipo</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Obrig.</th>
              <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Opções</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={f.variable} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                <td className="px-3 py-1.5">
                  <code className="text-xs font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">{f.variable}</code>
                </td>
                <td className="px-3 py-1.5 text-foreground">{f.label}</td>
                <td className="px-3 py-1.5 text-muted-foreground">{f.type}</td>
                <td className="px-3 py-1.5 text-center">{f.required ? "✓" : "—"}</td>
                <td className="px-3 py-1.5 text-xs text-muted-foreground">{f.options?.join(", ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function buildJsonExample(fields: FieldDoc[]): Record<string, string> {
  const obj: Record<string, string> = {};
  fields.forEach((f) => {
    if (f.type === "date") obj[f.variable] = "2025-01-15";
    else if (f.type === "time") obj[f.variable] = "14:30";
    else if (f.type === "number") obj[f.variable] = "2";
    else if (f.type === "email") obj[f.variable] = "cliente@email.com";
    else if (f.options) obj[f.variable] = f.options[0];
    else obj[f.variable] = `valor_${f.variable}`;
  });
  return obj;
}

export default function FerramentasDevDialog({ open, onOpenChange, tipo }: FerramentasDevDialogProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyJson = (label: string, fields: FieldDoc[]) => {
    const allFields = [...fields, ...personalFields];
    const json = JSON.stringify(buildJsonExample(allFields), null, 2);
    navigator.clipboard.writeText(json);
    setCopiedSection(label);
    toast.success(`JSON de exemplo (${label}) copiado!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const renderTransfer = () => (
    <Tabs defaultValue="somente_ida" className="space-y-4">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="somente_ida">Somente Ida</TabsTrigger>
        <TabsTrigger value="ida_volta">Ida e Volta</TabsTrigger>
        <TabsTrigger value="por_hora">Por Hora</TabsTrigger>
      </TabsList>

      <TabsContent value="somente_ida" className="space-y-4">
        <FieldTable fields={transferIdaDocs} sectionTitle="Dados da Viagem — Somente Ida" />
        <FieldTable fields={personalFields} sectionTitle="Informações Pessoais" />
        <CopyJsonButton label="Somente Ida" fields={transferIdaDocs} onCopy={copyJson} copied={copiedSection} />
      </TabsContent>

      <TabsContent value="ida_volta" className="space-y-4">
        <FieldTable fields={transferIdaDocs} sectionTitle="Dados da Ida" />
        <FieldTable fields={transferVoltaDocs} sectionTitle="Dados da Volta" />
        <FieldTable fields={personalFields} sectionTitle="Informações Pessoais" />
        <CopyJsonButton label="Ida e Volta" fields={[...transferIdaDocs, ...transferVoltaDocs]} onCopy={copyJson} copied={copiedSection} />
      </TabsContent>

      <TabsContent value="por_hora" className="space-y-4">
        <FieldTable fields={transferPorHoraDocs} sectionTitle="Dados da Viagem — Por Hora" />
        <FieldTable fields={personalFields} sectionTitle="Informações Pessoais" />
        <CopyJsonButton label="Por Hora" fields={transferPorHoraDocs} onCopy={copyJson} copied={copiedSection} />
      </TabsContent>
    </Tabs>
  );

  const renderGrupo = () => (
    <div className="space-y-4">
      <FieldTable fields={grupoDocs} sectionTitle="Dados da Viagem em Grupo" />
      <FieldTable fields={personalFields} sectionTitle="Informações Pessoais" />
      <CopyJsonButton label="Grupo" fields={grupoDocs} onCopy={copyJson} copied={copiedSection} />
    </div>
  );

  const renderMotorista = () => (
    <div className="space-y-4">
      <FieldTable fields={motoristaDocs} sectionTitle="Dados do Motorista" />
      <FieldTable fields={personalFields} sectionTitle="Informações Pessoais" />
      <CopyJsonButton label="Motorista" fields={motoristaDocs} onCopy={copyJson} copied={copiedSection} />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Ferramentas do Desenvolvedor
          </DialogTitle>
          <DialogDescription>
            Documentação dos campos e variáveis necessárias para os formulários externos. Compartilhe com o desenvolvedor para que ele construa os formulários que enviarão dados para o webhook.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="h-4 w-4 text-primary" />
            Instruções
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            O formulário externo deve enviar um <code className="bg-muted px-1 rounded font-mono">POST</code> para a URL do webhook com um JSON contendo as variáveis listadas abaixo. 
            Cada campo possui sua variável correspondente (coluna "Variável") que deve ser usada como chave no JSON. 
            Após o envio, os dados aparecerão em "Testes Recebidos". Mapeie as variáveis no painel de "Mapeamento de Campos" e ative o webhook para que os envios futuros sejam direcionados automaticamente para as Solicitações.
          </p>
        </div>

        {tipo === "transfer" && renderTransfer()}
        {tipo === "grupo" && renderGrupo()}
        {tipo === "motorista" && renderMotorista()}
      </DialogContent>
    </Dialog>
  );
}

function CopyJsonButton({
  label,
  fields,
  onCopy,
  copied,
}: {
  label: string;
  fields: FieldDoc[];
  onCopy: (label: string, fields: FieldDoc[]) => void;
  copied: string | null;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={() => onCopy(label, fields)}
    >
      <Copy className="h-3.5 w-3.5 mr-2" />
      {copied === label ? "Copiado!" : `Copiar JSON de exemplo — ${label}`}
    </Button>
  );
}
