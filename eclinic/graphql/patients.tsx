import { ApolloError } from "@apollo/client";
import { FormEvent, ChangeEvent } from "react";
import { partsFromDate } from "../utils/date";
import {
  Gender,
  Religion,
  MaritalStatus,
  GetPatients_patients_rows,
  GetPatient_patient,
  GetPatient_patient_medicalInfo,
  HivStatus,
  PregnancyStatus,
} from "./schema";

export interface PatientFormState {
  name: string;
  sex: Gender;
  day: string;
  month: string;
  year: string;
  mobile: string;
  email: string;
  nextOfKin: string;
  occupation: string;
  address: string;
  religion: Religion;
  maritalStatus: MaritalStatus;
  tribe: string;
  allergies: string;
  chronicIllness: string;
}

export interface PatientFormProps {
  title: string;
  loading: boolean;
  error: ApolloError | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  state: PatientFormState;
  update?: boolean;
}

export const INITAL_PATIENT_STATE: PatientFormState = {
  name: "",
  sex: Gender.MALE,
  day: "01",
  month: "01",
  year: "2021",
  mobile: "",
  email: "",
  nextOfKin: "",
  occupation: "",
  address: "",
  religion: Religion.CATHOLIC,
  maritalStatus: MaritalStatus.SINGLE,
  tribe: "",
  allergies: "",
  chronicIllness: "",
};

export function UpdatedPatientState(patient: GetPatients_patients_rows): PatientFormState {
  const { birthDate } = patient;
  const dob = new Date(birthDate);
  const { day, month, year } = partsFromDate(dob);

  return {
    name: patient.name,
    sex: Gender.MALE,
    day,
    month,
    year,
    mobile: patient.mobile ?? "",
    email: patient.email ?? "",
    nextOfKin: patient.nextOfKin ?? "",
    occupation: patient.occupation ?? "",
    address: patient.address ?? "",
    religion: patient.religion,
    maritalStatus: patient.maritalStatus,
    tribe: patient.tribe ?? "",
    allergies: patient.allergies ?? "",
    chronicIllness: patient.chronicIllness ?? "",
  };
}

export interface PatientDashboardProps {
  patient?: GetPatient_patient;
}

interface KeyValueInterface {
  [key: string]: string | boolean | null;
}

// ObjectType
export interface MedicalInfoIndexed extends KeyValueInterface, GetPatient_patient_medicalInfo {}

// State Type
export interface MedicalInfoStateIndexed extends KeyValueInterface {
  hypertension: false;
  diabetes: false;
  cancer: false;
  heart_disease: false;
  liver_disease: false;
  smoking: false;
  alcohol: false;
  sickle_cell: false;
  allergies: "";
  medication: "";
  previous_surgery: "";
  hiv: HivStatus;
  pregnancy: PregnancyStatus;
}

export interface StaticBioInfoProps {
  medicalInfo: MedicalInfoIndexed;
}

export const InitialMedicalInfo: MedicalInfoStateIndexed = {
  hypertension: false,
  diabetes: false,
  cancer: false,
  heart_disease: false,
  liver_disease: false,
  smoking: false,
  alcohol: false,
  sickle_cell: false,
  allergies: "",
  medication: "",
  previous_surgery: "",
  hiv: HivStatus.UNKNOWN,
  pregnancy: PregnancyStatus.NOT_APPLICABLE,
};
