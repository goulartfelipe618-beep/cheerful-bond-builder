import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Download } from "lucide-react";

interface Reserva {
  id: string;
  nome_completo: string;
  email: string;
  telefone: string;
  tipo_viagem: string;
  valor_total: number;
  status: string;
  created_at: string;
  ida_embarque: string | null;
  ida_desembarque: string | null;
  ida_data: string | null;
}

const tipoLabel: Record<string, string> = {
  somente_ida: "Somente Ida",
  ida_volta: "Ida e Volta",
  por_hora: "Por Hora",
};

interface Props {
  reserva: Reserva | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComunicar: (r: Reserva) => void;
  onDownload: (r: Reserva) => void;
}

export default function DetalhesReservaTransferSheet({ reserva, open, onOpenChange, onComunicar, onDownload }: Props) {
  if (!reserva) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalhes da Reserva</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Cliente" value={reserva.nome_completo} />
            <Field label="Telefone" value={reserva.telefone} />
            <Field label="Email" value={reserva.email} />
            <Field label="Tipo de Viagem" value={tipoLabel[reserva.tipo_viagem] || reserva.tipo_viagem} />
            <Field label="Embarque" value={reserva.ida_embarque} />
            <Field label="Desembarque" value={reserva.ida_desembarque} />
            <Field label="Data" value={reserva.ida_data ? new Date(reserva.ida_data).toLocaleDateString("pt-BR") : null} />
            <Field label="Valor Total" value={Number(reserva.valor_total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
            <Field label="Status" value={<Badge variant="outline">{reserva.status}</Badge>} />
          </div>

          <div className="text-xs text-muted-foreground">
            Criada em {new Date(reserva.created_at).toLocaleString("pt-BR")}
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onComunicar(reserva)} className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" /> Comunicar
            </Button>
            <Button variant="outline" onClick={() => onDownload(reserva)} className="flex-1">
              <Download className="h-4 w-4 mr-2" /> Download
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
