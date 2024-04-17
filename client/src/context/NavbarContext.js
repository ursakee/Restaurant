import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [showBackArrow, setShowBackArrow] = useState(false);

  return <NavbarContext.Provider value={{ showBackArrow, setShowBackArrow }}>{children}</NavbarContext.Provider>;
};
