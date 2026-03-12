import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./pages/dashboard/Home";
import MetricasPage from "./pages/dashboard/Metricas";
import TransferSolicitacoesPage from "./pages/dashboard/TransferSolicitacoes";
import TransferReservasPage from "./pages/dashboard/TransferReservas";
import TransferContratoPage from "./pages/dashboard/TransferContrato";
import TransferGeolocalizacaoPage from "./pages/dashboard/TransferGeolocalizacao";
import GruposSolicitacoesPage from "./pages/dashboard/GruposSolicitacoes";
import GruposReservasPage from "./pages/dashboard/GruposReservas";
import GruposContratoPage from "./pages/dashboard/GruposContrato";
import VeiculosPage from "./pages/dashboard/Veiculos";
import PlaceholderPage from "./pages/dashboard/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="metricas" element={<MetricasPage />} />
            <Route path="abrangencia" element={<PlaceholderPage />} />
            <Route path="transfer/solicitacoes" element={<TransferSolicitacoesPage />} />
            <Route path="transfer/reservas" element={<TransferReservasPage />} />
            <Route path="transfer/contrato" element={<TransferContratoPage />} />
            <Route path="transfer/geolocalizacao" element={<TransferGeolocalizacaoPage />} />
            <Route path="grupos/solicitacoes" element={<GruposSolicitacoesPage />} />
            <Route path="grupos/reservas" element={<GruposReservasPage />} />
            <Route path="grupos/contrato" element={<GruposContratoPage />} />
            <Route path="motoristas/cadastros" element={<PlaceholderPage />} />
            <Route path="motoristas/parcerias" element={<PlaceholderPage />} />
            <Route path="motoristas/solicitacoes" element={<PlaceholderPage />} />
            <Route path="motoristas/agendamentos" element={<PlaceholderPage />} />
            <Route path="veiculos" element={<VeiculosPage />} />
            <Route path="network" element={<PlaceholderPage />} />
            <Route path="google" element={<PlaceholderPage />} />
            <Route path="email-business" element={<PlaceholderPage />} />
            <Route path="website" element={<PlaceholderPage />} />
            <Route path="anotacoes" element={<PlaceholderPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
