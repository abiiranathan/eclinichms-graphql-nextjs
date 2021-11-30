import { createContext, useContext } from "react";
import { GetPatient_patient } from "../graphql/schema";

export const PatientContext = createContext<{
  patient: GetPatient_patient;
  refetchQueries: () => void;
}>(undefined!);

export const usePatient = () => {
  return useContext(PatientContext);
};
