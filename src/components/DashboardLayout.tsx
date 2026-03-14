import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Shield } from "lucide-react";

export default function DashboardLayout() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const handler = () => {
      const aceito = localStorage.getItem("network_nacional_aceito") === "sim";
      const highlightShown = localStorage.getItem("network_highlight_shown") === "sim";
      if (aceito && !highlightShown) {
        setShowOverlay(true);
      }
    };
    window.addEventListener("network-status-changed", handler);
    return () => window.removeEventListener("network-status-changed", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      setShowOverlay(false);
      localStorage.setItem("network_highlight_shown", "sim");
    };
    window.addEventListener("network-highlight-dismissed", handler);
    return () => window.removeEventListener("network-highlight-dismissed", handler);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b border-border bg-card px-4 gap-3">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">E-Transporte.pro — Gestão de Frota</span>
            </div>
          </header>
          <main className="flex-1 bg-background p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
        {/* Dark overlay when network highlight is active */}
        {showOverlay && (
          <div
            className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
            onClick={() => {
              setShowOverlay(false);
              localStorage.setItem("network_highlight_shown", "sim");
              window.dispatchEvent(new Event("network-highlight-dismissed"));
            }}
          />
        )}
      </div>
    </SidebarProvider>
  );
}
