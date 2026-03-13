import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function GruposSolicitacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Solicitações de Grupos</h1>
          <p className="text-muted-foreground">Registros recebidos via webhook. Converta em reserva para confirmar.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Exportar CSV</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Embarque</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Data Ida</TableHead>
              <TableHead>Passageiros</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-8">
                Nenhuma solicitação recebida.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
