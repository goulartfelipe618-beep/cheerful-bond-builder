import { Car, UserCheck, Handshake, Link2, Search } from "lucide-react";

const stats = [
  { label: "Total de Veículos", value: "0", icon: Car, color: "text-blue-500" },
  { label: "Motoristas", value: "0", icon: UserCheck, color: "text-orange-500" },
  { label: "Parceiros", value: "0", icon: Handshake, color: "text-red-500" },
  { label: "Ativos", value: "0", icon: Link2, color: "text-green-500" },
];

export default function VeiculosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Veículos</h1>
        <p className="text-muted-foreground">Consulta unificada da frota de motoristas e parceiros</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar placa, modelo, proprietário..." className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        </div>
        <select className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none">
          <option>Todas as Origens</option>
        </select>
        <select className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none">
          <option>Todos os Status</option>
        </select>
        <select className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none">
          <option>Todas as Marcas</option>
        </select>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}
