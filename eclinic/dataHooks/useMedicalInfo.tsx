import { useMutation } from "@apollo/client";
import { SAVE_MEDICAL_PROFILE, UPDATE_MEDICAL_PROFILE } from "../graphql/queries";
import {
  SaveMedicalProfile,
  SaveMedicalProfileVariables,
  UpdateMedicalProfile,
  UpdateMedicalProfileVariables,
} from "../graphql/schema";

export function useSaveMedicalInfo() {
  return useMutation<SaveMedicalProfile, SaveMedicalProfileVariables>(SAVE_MEDICAL_PROFILE);
}

export function useUpdateMedicalInfo() {
  return useMutation<UpdateMedicalProfile, UpdateMedicalProfileVariables>(UPDATE_MEDICAL_PROFILE);
}
