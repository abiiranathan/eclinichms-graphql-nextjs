import { useQuery } from "@apollo/client";
import { GET_PATIENT } from "../graphql/queries";
import { GetPatient, GetPatientVariables } from "../graphql/schema";

export default function useFetchPatient(id: string) {
  return useQuery<GetPatient, GetPatientVariables>(GET_PATIENT, {
    variables: { id: id as string },
  });
}
