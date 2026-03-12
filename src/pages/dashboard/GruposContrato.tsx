export default function GruposContratoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contrato de Grupo</h1>
        <p className="text-muted-foreground">Modelo de contrato para serviços de grupo</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-3">Modelo de Contrato</h3>
        <textarea
          readOnly
          className="w-full h-48 bg-muted rounded-lg p-4 text-sm text-foreground font-mono resize-y"
          defaultValue={`1. DAS PARTES
1.1. O presente contrato é celebrado entre as partes abaixo qualificadas.
1.2. O CONTRATANTE declara ter conhecimento de todas as condições do serviço contratado.

2. DO SERVIÇO
2.1. O serviço de transporte de grupo será realizado conforme trajeto, data e horário especificados neste instrumento.
2.2. O veículo será disponibilizado com motorista profissional habilitado.
2.3. O serviço inclui busca e transporte do grupo até o destino indicado.

3. DO VALOR
3.1. O valor do serviço será aquele especificado neste contrato.
3.2. O pagamento deverá ser efetuado na forma acordada entre as partes.`}
        />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-1">Política de Cancelamento</h3>
        <p className="text-sm text-muted-foreground mb-3">Regras para cancelamento e reembolso do serviço de grupo</p>
        <textarea
          readOnly
          className="w-full h-40 bg-muted rounded-lg p-4 text-sm text-foreground font-mono resize-y"
          defaultValue={`POLÍTICA DE CANCELAMENTO

- Cancelamentos com mais de 72 horas de antecedência: reembolso integral.
- Cancelamentos entre 48 e 72 horas: reembolso de 50%.
- Cancelamentos com menos de 48 horas: sem reembolso.
- No-show (não comparecimento): sem reembolso.

A empresa reserva-se o direito de cancelar o serviço em casos de força maior, oferecendo reagendamento ou reembolso integral.`}
        />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-1">Cláusulas Adicionais</h3>
        <p className="text-sm text-muted-foreground mb-3">Disposições finais e informações complementares</p>
        <textarea
          readOnly
          className="w-full h-40 bg-muted rounded-lg p-4 text-sm text-foreground font-mono resize-y"
          defaultValue={`CLÁUSULAS ADICIONAIS

8.1. Este contrato é regido pelas leis da República Federativa do Brasil.
8.2. Fica eleito o foro da comarca local para dirimir quaisquer dúvidas oriundas deste contrato.
8.3. As partes declaram ter lido e concordado com todos os termos deste contrato.
8.4. Alterações de trajeto durante o serviço poderão acarretar cobrança adicional.
8.5. É proibido o consumo de bebidas alcoólicas e alimentos que possam danificar o veículo.`}
        />
      </div>
    </div>
  );
}
