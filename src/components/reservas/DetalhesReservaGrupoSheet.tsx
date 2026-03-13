import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Download } from "lucide-react";

interface ReservaGrupo {
  id: string;
  nome_completo: string;
  email: string;
  whatsapp: string;
  tipo_veiculo: string | null;
  num_passageiros: number | null;
  embarque: string | null;
  destino: string | null;
  data_ida: string | null;
  valor_total: number;
  status: string;
  created_at: string;
}

const veiculoLabel: Record<string, string> = {
  van: "Van",
  micro_onibus: "Micro-ônibus",
  onibus: "Ônibus",
};

interface Props {
  reserva: ReservaGrupo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComunicar: (r: ReservaGrupo) => void;
  onDownload: (r: ReservaGrupo) => void;
}

export default function DetalhesReservaGrupoSheet({ reserva, open, onOpenChange, onComunicar, onDownload }: Props) {
  if (!reserva) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalhes da Reserva de Grupo</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Cliente" value={reserva.nome_completo} />
            <Field label="WhatsApp" value={reserva.whatsapp} />
            <Field label="Email" value={reserva.email} />
            <Field label="Veículo" value={reserva.tipo_veiculo ? veiculoLabel[reserva.tipo_veiculo] || reserva.tipo_veiculo : null} />
            <Field label="Passageiros" value={reserva.num_passageiros?.toString()} />
            <Field label="Embarque" value={reserva.embarque} />
            <Field label="Destino" value={reserva.destino} />
            <Field label="Data Ida" value={reserva.data_ida ? new Date(reserva.data_ida).toLocaleDateString("pt-BR") : null} />
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
