import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MotoristaSolicitacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Solicitações de Motoristas</h1>
          <p className="text-muted-foreground">Solicitações recebidas de pessoas que desejam ser motoristas parceiros.</p>
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
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>CNH</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Data</TableHead>
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
