import { RefreshCw, Download, Plus } from "lucide-react";

export default function GruposSolicitacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Solicitações de Grupos</h1>
          <p className="text-muted-foreground">Registros recebidos via webhook. Converta em reserva para confirmar.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Criar Reserva
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-3">Solicitações Recebidas</h3>
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}
