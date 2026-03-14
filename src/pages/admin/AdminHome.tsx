import { Shield, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Painel do Administrador Master
        </h1>
        <p className="text-muted-foreground mt-1">Gerencie os conteúdos exibidos para todos os motoristas da plataforma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/admin/slides")}
          className="rounded-xl border border-border bg-card p-6 flex items-start gap-4 hover:shadow-md transition-shadow text-left"
        >
          <div className="p-3 rounded-xl bg-primary/10">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Gerenciar Slides</h3>
            <p className="text-sm text-muted-foreground mt-1">Controle os banners exibidos nas páginas Home, Google, E-mail Business e Website dos motoristas.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
