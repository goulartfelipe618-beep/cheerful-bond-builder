import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowRightLeft } from "lucide-react";

interface SolicitacaoGrupo {
  id: string;
  nome_cliente: string;
  whatsapp: string | null;
  tipo_veiculo: string | null;
  embarque: string | null;
  destino: string | null;
  data_ida: string | null;
  num_passageiros: number | null;
  mensagem: string | null;
  status: string;
  created_at: string;
}

interface Props {
  solicitacao: SolicitacaoGrupo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConverter: (s: SolicitacaoGrupo) => void;
  onComunicar: (s: SolicitacaoGrupo) => void;
}

export default function DetalhesSolicitacaoGrupoSheet({ solicitacao, open, onOpenChange, onConverter, onComunicar }: Props) {
  if (!solicitacao) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalhes da Solicitação</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Cliente" value={solicitacao.nome_cliente} />
            <Field label="WhatsApp" value={solicitacao.whatsapp} />
            <Field label="Veículo" value={solicitacao.tipo_veiculo} />
            <Field label="Passageiros" value={solicitacao.num_passageiros?.toString()} />
            <Field label="Embarque" value={solicitacao.embarque} />
            <Field label="Destino" value={solicitacao.destino} />
            <Field label="Data Ida" value={solicitacao.data_ida ? new Date(solicitacao.data_ida).toLocaleDateString("pt-BR") : null} />
            <Field label="Status" value={<Badge variant="outline">{solicitacao.status}</Badge>} />
          </div>

          {solicitacao.mensagem && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Mensagem</p>
              <p className="text-sm bg-muted/50 rounded-lg p-3">{solicitacao.mensagem}</p>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Recebida em {new Date(solicitacao.created_at).toLocaleString("pt-BR")}
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            {solicitacao.status === "pendente" && (
              <Button onClick={() => onConverter(solicitacao)} className="flex-1">
                <ArrowRightLeft className="h-4 w-4 mr-2" /> Converter em Reserva
              </Button>
            )}
            <Button variant="outline" onClick={() => onComunicar(solicitacao)} className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" /> Comunicar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode | string | null | undefined }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  );
}
