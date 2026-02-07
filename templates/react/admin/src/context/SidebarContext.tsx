import { createContext, type Dispatch, type SetStateAction } from "react";

export const SidebarContext = createContext<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}>({
  show: true,
  setShow: () => {},
});
