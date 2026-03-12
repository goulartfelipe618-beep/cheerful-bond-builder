import { Activity, CheckCircle, Clock, TrendingUp, ArrowLeftRight, Users, UserCheck, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const barData = [
  { name: "out.", Transfer: 0, Grupos: 0, Motoristas: 0 },
  { name: "nov.", Transfer: 0, Grupos: 0, Motoristas: 0 },
  { name: "dez.", Transfer: 0, Grupos: 0, Motoristas: 0 },
  { name: "jan.", Transfer: 0, Grupos: 0, Motoristas: 0 },
  { name: "fev.", Transfer: 0, Grupos: 0.5, Motoristas: 0 },
  { name: "mar.", Transfer: 0, Grupos: 1, Motoristas: 0 },
];

const pieData = [{ name: "convertida", value: 1 }];
const COLORS = ["hsl(220, 10%, 30%)"];

const stats = [
  { label: "Total Solicitações", value: "1", icon: Activity, color: "text-primary" },
  { label: "Reservas Ativas", value: "1", icon: CheckCircle, color: "text-green-500" },
  { label: "Pendentes", value: "0", icon: Clock, color: "text-yellow-500" },
  { label: "Faturamento", value: "R$ 0,00", icon: TrendingUp, color: "text-blue-500" },
];

export default function MetricasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Métricas</h1>
        <p className="text-muted-foreground">Indicadores de performance e KPIs do seu negócio</p>
      </div>

      {/* KPI Cards */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Evolução Mensal</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 22%)" />
              <XAxis dataKey="name" stroke="hsl(0, 0%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(0, 0%, 55%)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="Transfer" fill="hsl(220, 10%, 30%)" />
              <Bar dataKey="Grupos" fill="hsl(220, 10%, 40%)" />
              <Bar dataKey="Motoristas" fill="hsl(220, 10%, 50%)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
            <span>■ Transfer</span>
            <span>■ Grupos</span>
            <span>■ Motoristas</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Status das Solicitações</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Transfer</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Solicitações</span><span className="font-medium text-foreground">0</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Reservas</span><span className="font-medium text-foreground">0</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Este mês</span><span className="font-medium text-foreground">0</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Faturamento</span><span className="font-medium text-foreground">R$ 0,00</span></div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Grupos</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Solicitações</span><span className="font-medium text-foreground">1</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Reservas</span><span className="font-medium text-foreground">1</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Este mês</span><span className="font-medium text-foreground">1</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Faturamento</span><span className="font-medium text-foreground">R$ 0,00</span></div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Motoristas</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Candidaturas</span><span className="font-medium text-foreground text-orange-500">0</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cadastrados</span><span className="font-medium text-foreground text-blue-500">1</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Este mês</span><span className="font-medium text-foreground text-red-500">0</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Ativos</span><span className="font-medium text-foreground text-green-500">1</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
