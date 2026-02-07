import { useState, type ReactNode } from "react";
import { SidebarContext } from "../SidebarContext";

type PropTypes = {
  children: ReactNode;
};

export const SidebarContextProvider = ({ children }: PropTypes) => {
  const [show, setShow] = useState(true);

  return (
    <SidebarContext.Provider value={{ show, setShow }}>
      {children}
    </SidebarContext.Provider>
  );
};
