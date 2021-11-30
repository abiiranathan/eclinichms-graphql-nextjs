import { createContext, useContext } from "react";

interface ToolbarInterface {
  showSideBar: boolean | null;
  setShowSidebar: (flag: boolean) => void;
}

export const ToolBarContext = createContext<ToolbarInterface>({
  showSideBar: false,
  setShowSidebar: (flag: boolean) => {},
});

export const useToolBarContext = () => useContext(ToolBarContext);
