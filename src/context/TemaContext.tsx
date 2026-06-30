import { createContext, useContext, useEffect, useState } from "react";

type TemaContextType = {
  tema: string;
  toggleTema: () => void;
}

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "light"
  })

  useEffect(() => {
  document.documentElement.setAttribute("data-theme", tema)
  }, [])

  const toggleTema = () => {
    const nuevoTema = tema === "light" ? "dark" : "light"
    setTema(nuevoTema)
    document.documentElement.setAttribute("data-theme", nuevoTema)
    localStorage.setItem("tema", nuevoTema)
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}


export function useTema() {
  const context = useContext(TemaContext);
  if(!context) throw new Error("useTema debe usarse dentro de TemaProvider");
  return context;
}