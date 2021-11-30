/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchItems
// ====================================================

export interface FetchItems_items_rows {
  __typename: "Item";
  id: string;
  name: string;
  cost: number;
}

export interface FetchItems_items {
  __typename: "PaginatedItems";
  rows: FetchItems_items_rows[];
  count: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FetchItems {
  items: FetchItems_items;
}

export interface FetchItemsVariables {
  type?: ItemType | null;
  name?: string | null;
  page?: number | null;
  pageSize?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_login_user {
  __typename: "User";
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  sex: Gender;
  mobile: string;
  isAdmin: boolean;
  createdAt: any;
  updatedAt: any;
  role: UserRole;
}

export interface LoginUser_login {
  __typename: "LoginResponse";
  user: LoginUser_login_user;
  token: string;
}

export interface LoginUser {
  login: LoginUser_login;
}

export interface LoginUserVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifyLoginStatus
// ====================================================

export interface VerifyLoginStatus_currentUser {
  __typename: "User";
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  sex: Gender;
  mobile: string;
  isAdmin: boolean;
  createdAt: any;
  updatedAt: any;
  role: UserRole;
}

export interface VerifyLoginStatus {
  currentUser: VerifyLoginStatus_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_registerUser_user {
  __typename: "User";
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  sex: Gender;
  mobile: string;
  isAdmin: boolean;
  createdAt: any;
  updatedAt: any;
  role: UserRole;
}

export interface RegisterUser_registerUser {
  __typename: "LoginResponse";
  user: RegisterUser_registerUser_user;
  token: string;
}

export interface RegisterUser {
  registerUser: RegisterUser_registerUser;
}

export interface RegisterUserVariables {
  user: RegisterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: "User";
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  sex: Gender;
  mobile: string;
  isAdmin: boolean;
  createdAt: any;
  updatedAt: any;
  role: UserRole;
}

export interface GetUsers {
  users: GetUsers_users[] | null;
}

export interface GetUsersVariables {
  role?: UserRole | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  id: string;
  username: string;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  id: string;
  user: UserUpdates;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser {
  deleteUser: string;
}

export interface DeleteUserVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPtients
// ====================================================

export interface SearchPtients_patients_rows_visits_doctor {
  __typename: "User";
  id: string;
  name: string;
}

export interface SearchPtients_patients_rows_visits {
  __typename: "Visit";
  id: string;
  reason: string;
  doctor: SearchPtients_patients_rows_visits_doctor;
  department: string;
  createdAt: any;
}

export interface SearchPtients_patients_rows {
  __typename: "Patient";
  id: string;
  name: string;
  sex: Gender;
  birthDate: any;
  mobile: string | null;
  nextOfKin: string | null;
  occupation: string | null;
  visits: SearchPtients_patients_rows_visits[];
}

export interface SearchPtients_patients {
  __typename: "PaginatedPatients";
  count: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  rows: SearchPtients_patients_rows[];
}

export interface SearchPtients {
  patients: SearchPtients_patients;
}

export interface SearchPtientsVariables {
  name: string;
  page: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatients
// ====================================================

export interface GetPatients_patients_rows_visits_doctor {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetPatients_patients_rows_visits {
  __typename: "Visit";
  id: string;
  reason: string;
  department: string;
  doctor: GetPatients_patients_rows_visits_doctor;
}

export interface GetPatients_patients_rows {
  __typename: "Patient";
  id: string;
  name: string;
  birthDate: any;
  sex: Gender;
  address: string;
  nextOfKin: string | null;
  religion: Religion;
  maritalStatus: MaritalStatus;
  tribe: string | null;
  occupation: string | null;
  allergies: string | null;
  chronicIllness: string | null;
  mobile: string | null;
  email: string | null;
  createdAt: any;
  updatedAt: any | null;
  visits: GetPatients_patients_rows_visits[];
}

export interface GetPatients_patients {
  __typename: "PaginatedPatients";
  count: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  rows: GetPatients_patients_rows[];
}

export interface GetPatients {
  patients: GetPatients_patients;
}

export interface GetPatientsVariables {
  name?: string | null;
  page?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterPatient
// ====================================================

export interface RegisterPatient_registerPatient {
  __typename: "Patient";
  id: string;
  name: string;
  birthDate: any;
  sex: Gender;
  address: string;
  nextOfKin: string | null;
  religion: Religion;
  maritalStatus: MaritalStatus;
  tribe: string | null;
  occupation: string | null;
  allergies: string | null;
  chronicIllness: string | null;
  mobile: string | null;
  email: string | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface RegisterPatient {
  registerPatient: RegisterPatient_registerPatient;
}

export interface RegisterPatientVariables {
  data: PatientInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatient
// ====================================================

export interface GetPatient_patient_medicalInfo {
  __typename: "MedicalInfo";
  id: string;
  hypertension: boolean;
  diabetes: boolean;
  hiv: HivStatus;
  cancer: boolean;
  heart_disease: boolean;
  liver_disease: boolean;
  smoking: boolean;
  alcohol: boolean;
  sickle_cell: boolean;
  allergies: string | null;
  medication: string | null;
  previous_surgery: string | null;
  pregnancy: PregnancyStatus;
  createdAt: any;
  updatedAt: any;
  patientId: string;
}

export interface GetPatient_patient_visits_ward {
  __typename: "Ward";
  id: string;
  name: string;
}

export interface GetPatient_patient_visits_doctor {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetPatient_patient_visits_consultation {
  __typename: "Consultation";
  id: string;
  name: string;
}

export interface GetPatient_patient_visits_clerkship {
  __typename: "Clerkship";
  id: string;
}

export interface GetPatient_patient_visits {
  __typename: "Visit";
  id: string;
  reason: string;
  department: string;
  patientId: string;
  isDischarged: boolean;
  seenDoctor: boolean;
  createdAt: any;
  ward: GetPatient_patient_visits_ward;
  doctor: GetPatient_patient_visits_doctor;
  consultation: GetPatient_patient_visits_consultation;
  clerkship: GetPatient_patient_visits_clerkship | null;
}

export interface GetPatient_patient {
  __typename: "Patient";
  id: string;
  name: string;
  birthDate: any;
  sex: Gender;
  address: string;
  nextOfKin: string | null;
  religion: Religion;
  maritalStatus: MaritalStatus;
  tribe: string | null;
  occupation: string | null;
  allergies: string | null;
  chronicIllness: string | null;
  mobile: string | null;
  email: string | null;
  createdAt: any;
  updatedAt: any | null;
  medicalInfo: GetPatient_patient_medicalInfo | null;
  visits: GetPatient_patient_visits[];
}

export interface GetPatient {
  patient: GetPatient_patient;
}

export interface GetPatientVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePatient
// ====================================================

export interface UpdatePatient_updatePatient {
  __typename: "Patient";
  id: string;
}

export interface UpdatePatient {
  updatePatient: UpdatePatient_updatePatient;
}

export interface UpdatePatientVariables {
  id: string;
  data: PatientInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePatient
// ====================================================

export interface DeletePatient {
  deletePatient: string;
}

export interface DeletePatientVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveMedicalProfile
// ====================================================

export interface SaveMedicalProfile_saveMedicalInfo {
  __typename: "MedicalInfo";
  id: string;
  hypertension: boolean;
  diabetes: boolean;
  hiv: HivStatus;
  cancer: boolean;
  heart_disease: boolean;
  liver_disease: boolean;
  smoking: boolean;
  alcohol: boolean;
  sickle_cell: boolean;
  allergies: string | null;
  medication: string | null;
  previous_surgery: string | null;
  pregnancy: PregnancyStatus;
  createdAt: any;
  updatedAt: any;
  patientId: string;
}

export interface SaveMedicalProfile {
  saveMedicalInfo: SaveMedicalProfile_saveMedicalInfo;
}

export interface SaveMedicalProfileVariables {
  data: MedicalInfoInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMedicalProfile
// ====================================================

export interface UpdateMedicalProfile_updateMedicalInfo {
  __typename: "MedicalInfo";
  id: string;
  hypertension: boolean;
  diabetes: boolean;
  hiv: HivStatus;
  cancer: boolean;
  heart_disease: boolean;
  liver_disease: boolean;
  smoking: boolean;
  alcohol: boolean;
  sickle_cell: boolean;
  allergies: string | null;
  medication: string | null;
  previous_surgery: string | null;
  pregnancy: PregnancyStatus;
  createdAt: any;
  updatedAt: any;
  patientId: string;
}

export interface UpdateMedicalProfile {
  updateMedicalInfo: UpdateMedicalProfile_updateMedicalInfo;
}

export interface UpdateMedicalProfileVariables {
  id: string;
  data: MedicalInfoInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVisits
// ====================================================

export interface GetVisits_visits_rows_patient {
  __typename: "Patient";
  id: string;
  name: string;
  email: string | null;
  birthDate: any;
  sex: Gender;
}

export interface GetVisits_visits_rows_ward {
  __typename: "Ward";
  id: string;
  name: string;
}

export interface GetVisits_visits_rows_doctor {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetVisits_visits_rows_consultation {
  __typename: "Consultation";
  id: string;
  name: string;
}

export interface GetVisits_visits_rows_clerkship {
  __typename: "Clerkship";
  id: string;
}

export interface GetVisits_visits_rows {
  __typename: "Visit";
  id: string;
  reason: string;
  department: string;
  patientId: string;
  isDischarged: boolean;
  seenDoctor: boolean;
  createdAt: any;
  patient: GetVisits_visits_rows_patient;
  ward: GetVisits_visits_rows_ward;
  doctor: GetVisits_visits_rows_doctor;
  consultation: GetVisits_visits_rows_consultation;
  clerkship: GetVisits_visits_rows_clerkship | null;
}

export interface GetVisits_visits {
  __typename: "PaginatedVisits";
  count: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  rows: GetVisits_visits_rows[];
}

export interface GetVisits {
  visits: GetVisits_visits;
}

export interface GetVisitsVariables {
  name?: string | null;
  doctor?: string | null;
  reason?: Reason | null;
  page?: number | null;
  pageSize?: number | null;
  ordering?: Order | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVisit
// ====================================================

export interface GetVisit_visit_patient {
  __typename: "Patient";
  id: string;
  name: string;
  birthDate: any;
  sex: Gender;
}

export interface GetVisit_visit_ward {
  __typename: "Ward";
  id: string;
  name: string;
}

export interface GetVisit_visit_doctor {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetVisit_visit_consultation {
  __typename: "Consultation";
  id: string;
  name: string;
}

export interface GetVisit_visit_clerkship {
  __typename: "Clerkship";
  id: string;
  pc: string;
  hpc: string;
  ros: string | null;
  past_history: string | null;
  jaundice: Jaundice | null;
  pallor: Pallor | null;
  cyanosis: Cyanosis | null;
  clubbing: Clubbing | null;
  oedema: Oedema | null;
  lymphadenopathy: string | null;
  skin: string | null;
  systemic_examination: string;
  diagnosis: string;
  differentials: string | null;
  plan: string;
  createdAt: any;
  updatedAt: any;
}

export interface GetVisit_visit_vitals_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetVisit_visit_vitals {
  __typename: "VitalSigns";
  id: string;
  sbp: number | null;
  dbp: number | null;
  pulse: number;
  temperature: number | null;
  resp: number;
  spo2: number | null;
  weight: number | null;
  height: number | null;
  gcs: number;
  muac: number | null;
  user: GetVisit_visit_vitals_user;
  createdAt: any;
  updatedAt: any | null;
}

export interface GetVisit_visit {
  __typename: "Visit";
  id: string;
  reason: string;
  department: string;
  patientId: string;
  isDischarged: boolean;
  seenDoctor: boolean;
  createdAt: any;
  patient: GetVisit_visit_patient;
  ward: GetVisit_visit_ward;
  doctor: GetVisit_visit_doctor;
  consultation: GetVisit_visit_consultation;
  clerkship: GetVisit_visit_clerkship | null;
  vitals: GetVisit_visit_vitals[];
}

export interface GetVisit {
  visit: GetVisit_visit;
}

export interface GetVisitVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterVisit
// ====================================================

export interface RegisterVisit_registerVisit_ward {
  __typename: "Ward";
  id: string;
  name: string;
}

export interface RegisterVisit_registerVisit_doctor {
  __typename: "User";
  id: string;
  name: string;
}

export interface RegisterVisit_registerVisit_consultation {
  __typename: "Consultation";
  id: string;
  name: string;
}

export interface RegisterVisit_registerVisit_clerkship {
  __typename: "Clerkship";
  id: string;
}

export interface RegisterVisit_registerVisit {
  __typename: "Visit";
  id: string;
  reason: string;
  department: string;
  patientId: string;
  isDischarged: boolean;
  seenDoctor: boolean;
  createdAt: any;
  ward: RegisterVisit_registerVisit_ward;
  doctor: RegisterVisit_registerVisit_doctor;
  consultation: RegisterVisit_registerVisit_consultation;
  clerkship: RegisterVisit_registerVisit_clerkship | null;
}

export interface RegisterVisit {
  registerVisit: RegisterVisit_registerVisit;
}

export interface RegisterVisitVariables {
  data: NewVisit;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteVisit
// ====================================================

export interface DeleteVisit {
  deleteVisit: string;
}

export interface DeleteVisitVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWards
// ====================================================

export interface GetWards_wards {
  __typename: "Ward";
  id: string;
  name: string;
}

export interface GetWards {
  wards: GetWards_wards[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConsultations
// ====================================================

export interface GetConsultations_consultations {
  __typename: "Consultation";
  id: string;
  name: string;
  fee: number;
}

export interface GetConsultations {
  consultations: GetConsultations_consultations[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveVitals
// ====================================================

export interface SaveVitals_saveVitals_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface SaveVitals_saveVitals {
  __typename: "VitalSigns";
  id: string;
  visitId: string;
  sbp: number | null;
  dbp: number | null;
  pulse: number;
  temperature: number | null;
  resp: number;
  spo2: number | null;
  weight: number | null;
  height: number | null;
  gcs: number;
  muac: number | null;
  user: SaveVitals_saveVitals_user;
  createdAt: any;
}

export interface SaveVitals {
  saveVitals: SaveVitals_saveVitals;
}

export interface SaveVitalsVariables {
  data: VitalsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Clubbing {
  GRADE_1 = "GRADE_1",
  GRADE_2 = "GRADE_2",
  GRADE_3 = "GRADE_3",
  GRADE_4 = "GRADE_4",
  HPOAP = "HPOAP",
  NONE = "NONE",
}

export enum Cyanosis {
  ACROCYANOSIS = "ACROCYANOSIS",
  CENTRAL = "CENTRAL",
  NONE = "NONE",
  PERIPHERAL = "PERIPHERAL",
}

export enum Department {
  GYNAECOLOGY = "GYNAECOLOGY",
  MEDICINE = "MEDICINE",
  OBSTETRICS = "OBSTETRICS",
  OUTPATIENT = "OUTPATIENT",
  PAEDIATRICS = "PAEDIATRICS",
  SURGERY = "SURGERY",
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export enum HivStatus {
  NEGATIVE = "NEGATIVE",
  POSITIVE = "POSITIVE",
  UNKNOWN = "UNKNOWN",
}

export enum ItemType {
  CONSUMABLE = "CONSUMABLE",
  DRUG = "DRUG",
  PROCEDURE = "PROCEDURE",
  TEST = "TEST",
}

export enum Jaundice {
  DEEP = "DEEP",
  MODERATE = "MODERATE",
  NONE = "NONE",
  TINGE = "TINGE",
}

export enum MaritalStatus {
  COHABITING = "COHABITING",
  DIVORCED = "DIVORCED",
  MARRIED = "MARRIED",
  NA = "NA",
  SINGLE = "SINGLE",
  WIDOW = "WIDOW",
  WIDOWER = "WIDOWER",
}

export enum Oedema {
  ANARSACA = "ANARSACA",
  GRADE_1 = "GRADE_1",
  GRADE_2 = "GRADE_2",
  GRADE_3 = "GRADE_3",
  NONE = "NONE",
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export enum Pallor {
  MILD = "MILD",
  MODERATE = "MODERATE",
  NONE = "NONE",
  PAPER_WHITE = "PAPER_WHITE",
  SEVERE = "SEVERE",
}

export enum PregnancyStatus {
  FIRST_TRIMESTER = "FIRST_TRIMESTER",
  NOT_APPLICABLE = "NOT_APPLICABLE",
  PEURPERIUM = "PEURPERIUM",
  SECOND_TRIMESTER = "SECOND_TRIMESTER",
  THIRD_TRIMESTER = "THIRD_TRIMESTER",
}

export enum Reason {
  CONSULTATION = "CONSULTATION",
  LABORATORY_ONLY = "LABORATORY_ONLY",
  PHARMACY_ONLY = "PHARMACY_ONLY",
}

export enum Religion {
  CATHOLIC = "CATHOLIC",
  MOSLEM = "MOSLEM",
  ORTHODOX = "ORTHODOX",
  OTHER = "OTHER",
  PENTECOSTAL = "PENTECOSTAL",
  PROTESTANT = "PROTESTANT",
  SDA = "SDA",
}

export enum UserRole {
  ACCOUNTS = "ACCOUNTS",
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  LAB = "LAB",
  MIDWIFE = "MIDWIFE",
  NURSE = "NURSE",
  PHARMACY = "PHARMACY",
  RADIOLOGY = "RADIOLOGY",
  STORE = "STORE",
}

export interface MedicalInfoInput {
  hypertension: boolean;
  diabetes: boolean;
  hiv: HivStatus;
  cancer: boolean;
  heart_disease: boolean;
  liver_disease: boolean;
  smoking: boolean;
  alcohol: boolean;
  sickle_cell: boolean;
  allergies?: string | null;
  medication?: string | null;
  previous_surgery?: string | null;
  pregnancy: PregnancyStatus;
  patientId: string;
}

export interface NewVisit {
  patientId: string;
  wardId: string;
  consultationId: string;
  doctorId: string;
  reason: Reason;
  department: Department;
  isDischarged?: boolean | null;
}

export interface PatientInput {
  name: string;
  birthDate: string;
  sex: Gender;
  address: string;
  nextOfKin?: string | null;
  religion: Religion;
  maritalStatus: MaritalStatus;
  tribe?: string | null;
  occupation?: string | null;
  allergies?: string | null;
  chronicIllness?: string | null;
  mobile?: string | null;
  email?: string | null;
}

export interface RegisterInput {
  name: string;
  age: number;
  username: string;
  email: string;
  password: string;
  mobile: string;
  sex: Gender;
  role: UserRole;
}

export interface UserUpdates {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  mobile?: string | null;
  age?: number | null;
}

export interface VitalsInput {
  sbp?: number | null;
  dbp?: number | null;
  pulse: number;
  temperature?: number | null;
  resp: number;
  spo2?: number | null;
  weight?: number | null;
  height?: number | null;
  gcs: number;
  muac?: number | null;
  visitId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
