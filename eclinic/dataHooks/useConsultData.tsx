import { useQuery } from "@apollo/client";
import { GET_CONSULTATIONS, GET_USERS, GET_WARDS } from "../graphql/queries";
import {
  GetConsultations,
  GetUsers,
  GetUsersVariables,
  GetWards,
  UserRole,
} from "../graphql/schema";

interface Props {
  role: UserRole;
}

export default function useConsultData({ role }: Props) {
  const { data: doctors } = useQuery<GetUsers, GetUsersVariables>(GET_USERS, {
    variables: { role },
  });

  const { data: wards } = useQuery<GetWards>(GET_WARDS);
  const { data: consultations } = useQuery<GetConsultations>(GET_CONSULTATIONS);

  return { doctors, wards, consultations };
}
