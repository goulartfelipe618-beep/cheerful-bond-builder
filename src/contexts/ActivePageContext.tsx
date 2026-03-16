import { createContext, useContext, useState, ReactNode } from "react";

interface ActivePageContextType {
  activePage: string;
  setActivePage: (page: string) => void;
}

const ActivePageContext = createContext<ActivePageContextType>({
  activePage: "",
  setActivePage: () => {},
});

export function ActivePageProvider({ defaultPage, children }: { defaultPage: string; children: ReactNode }) {
  const [activePage, setActivePage] = useState(defaultPage);
  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
}

export const useActivePage = () => useContext(ActivePageContext);
