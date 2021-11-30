import { GetPatient_patient } from "../graphql/schema";
import { PatientContext } from "./PatientContext";

interface Props {
  children: React.ReactNode;
  context: {
    patient: GetPatient_patient;
    refetchQueries: () => void;
  };
}

export const PatientProvider = ({ children, context }: Props) => {
  if (!context.patient) return null;

  return <PatientContext.Provider value={context}>{children}</PatientContext.Provider>;
};
