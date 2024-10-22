import { createContext, ReactNode, useState } from "react";

interface CursorContextType {
  size: string;
  setSize: (size: string) => void;
}

export const CursorContext = createContext<CursorContextType | undefined>(
  undefined
);

interface CursorManagerProps {
  children: ReactNode;
}

export default function CursorManager({ children }: CursorManagerProps) {
  const [size, setSize] = useState<string>("small");
  return (
    <CursorContext.Provider value={{ size, setSize }}>
      {children}
    </CursorContext.Provider>
  );
}
