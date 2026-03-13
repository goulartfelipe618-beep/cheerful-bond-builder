import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Configuracoes {
  nome_projeto: string;
  logo_url: string;
  fonte_global: string;
}

interface ConfiguracoesContextType {
  config: Configuracoes;
  refreshConfig: () => Promise<void>;
}

const defaultConfig: Configuracoes = {
  nome_projeto: "E-Transporte.pro",
  logo_url: "",
  fonte_global: "montserrat",
};

const ConfiguracoesContext = createContext<ConfiguracoesContextType>({
  config: defaultConfig,
  refreshConfig: async () => {},
});

export const useConfiguracoes = () => useContext(ConfiguracoesContext);

const FONT_MAP: Record<string, string> = {
  montserrat: "'Montserrat', sans-serif",
  inter: "'Inter', sans-serif",
  roboto: "'Roboto', sans-serif",
  opensans: "'Open Sans', sans-serif",
  lato: "'Lato', sans-serif",
  poppins: "'Poppins', sans-serif",
};

export function ConfiguracoesProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Configuracoes>(defaultConfig);

  const fetchConfig = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("configuracoes" as any)
      .select("nome_projeto, logo_url, fonte_global")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      const d = data as any;
      setConfig({
        nome_projeto: d.nome_projeto || defaultConfig.nome_projeto,
        logo_url: d.logo_url || "",
        fonte_global: d.fonte_global || defaultConfig.fonte_global,
      });
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Apply font globally
  useEffect(() => {
    const fontFamily = FONT_MAP[config.fonte_global] || FONT_MAP.montserrat;
    document.documentElement.style.fontFamily = fontFamily;
  }, [config.fonte_global]);

  return (
    <ConfiguracoesContext.Provider value={{ config, refreshConfig: fetchConfig }}>
      {children}
    </ConfiguracoesContext.Provider>
  );
}
