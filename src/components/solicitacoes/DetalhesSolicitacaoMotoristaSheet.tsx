import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserCheck } from "lucide-react";

interface SolicitacaoMotorista {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  cpf: string | null;
  cnh: string | null;
  cidade: string | null;
  mensagem: string | null;
  status: string;
  created_at: string;
}

interface Props {
  solicitacao: SolicitacaoMotorista | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConverter: (s: SolicitacaoMotorista) => void;
  onComunicar: (s: SolicitacaoMotorista) => void;
}

export default function DetalhesSolicitacaoMotoristaSheet({ solicitacao, open, onOpenChange, onConverter, onComunicar }: Props) {
  if (!solicitacao) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalhes do Motorista</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nome" value={solicitacao.nome} />
            <Field label="Email" value={solicitacao.email} />
            <Field label="Telefone" value={solicitacao.telefone} />
            <Field label="CPF" value={solicitacao.cpf} />
            <Field label="CNH" value={solicitacao.cnh} />
            <Field label="Cidade" value={solicitacao.cidade} />
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
                <UserCheck className="h-4 w-4 mr-2" /> Converter para Cadastrado
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
