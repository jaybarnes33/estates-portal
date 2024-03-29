import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";

import { createContext, useContext } from "react";

interface ModalContextInterface {
  toggle: () => void;
  open: boolean;
  content: ReactNode;
  setContent: Dispatch<SetStateAction<ReactNode>>;
}

const ModalCtx = createContext<ModalContextInterface | null>(null);

// Provider in your app

interface IProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>("");

  const toggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <ModalCtx.Provider
      value={{
        toggle,
        content,
        setContent,
        open,
      }}
    >
      {children}
    </ModalCtx.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalCtx);

  if (!context) {
    throw new Error("useModal was called without a provider");
  }

  return context;
};

export default ModalProvider;
