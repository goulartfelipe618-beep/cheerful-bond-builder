import { ClipboardList } from "lucide-react";

export default function AdminUsuariosSolicitacoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          Solicitações de Acesso
        </h1>
        <p className="text-muted-foreground mt-1">Solicitações de novos usuários que desejam adquirir acesso à plataforma.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-semibold text-foreground mb-1">Nenhuma solicitação pendente</h3>
        <p className="text-sm text-muted-foreground">Quando novos usuários solicitarem acesso, eles aparecerão aqui para aprovação.</p>
      </div>
    </div>
  );
}
