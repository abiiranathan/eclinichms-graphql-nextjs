import { useQuery } from "@apollo/client";
import { GET_VISIT } from "../graphql/queries";
import { GetVisit, GetVisitVariables } from "../graphql/schema";

export default function useFetchVisit(visitId: string) {
  return useQuery<GetVisit, GetVisitVariables>(GET_VISIT, { variables: { id: visitId } });
}
