export default function TransferReservasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reservas</h1>
        <p className="text-muted-foreground">Reservas convertidas a partir de solicitações</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-3">Reservas Ativas</h3>
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}
