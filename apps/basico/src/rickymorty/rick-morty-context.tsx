import React from "react";

interface Props {
  children: React.ReactNode
}

export const RickMortyContext = React.createContext(null);

export const RickMortyProvider: React.FC<Props> = ({ children }) => {
  const [filterContext, setFilterContext] = React.useState<string>(undefined);

  return (
    <RickMortyContext.Provider value={{ filterContext, setFilterContext }}>
      {children}
    </RickMortyContext.Provider>
  );
}