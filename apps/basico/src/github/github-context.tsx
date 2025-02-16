import React from "react";

interface Props {
  children: React.ReactNode
}

export const GitHubContext = React.createContext(null);

export const GitHubProvider: React.FC<Props> = ({ children }) => {
  const [organization, setOrganization] = React.useState("lemoncode");

  return (
    <GitHubContext.Provider value={{ organization, setOrganization }}>
      {children}
    </GitHubContext.Provider>
  );
}


