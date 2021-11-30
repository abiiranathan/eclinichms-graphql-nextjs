import { createContext, ReactNode, useContext } from "react";
import { GetVisit_visit } from "../graphql/schema";

interface VisitContextType {
  loading: boolean;
  visit: GetVisit_visit;
  refetchQueries: () => void;
}

const VisitContext = createContext<VisitContextType>(undefined!);

export const useVisit = () => {
  const ctx = useContext(VisitContext);

  if (ctx === undefined) {
    throw new Error("useVisit must be called inside Visit Provider");
  }
  return ctx;
};

interface ProviderProps {
  children: ReactNode;
  value: VisitContextType;
}

export const VisitProvider = ({ children, value }: ProviderProps) => {
  if (!value.visit) return null;

  return <VisitContext.Provider value={value}>{children}</VisitContext.Provider>;
};
