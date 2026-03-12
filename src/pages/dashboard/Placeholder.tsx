import { useLocation } from "react-router-dom";

export default function PlaceholderPage() {
  const location = useLocation();
  const title = location.pathname.split("/").pop()?.replace(/-/g, " ") || "Página";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground capitalize">{title}</h1>
        <p className="text-muted-foreground">Em desenvolvimento</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Esta funcionalidade será implementada em breve.</p>
      </div>
    </div>
  );
}
