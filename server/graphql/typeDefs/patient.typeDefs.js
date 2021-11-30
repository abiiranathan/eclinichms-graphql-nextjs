const { gql } = require("apollo-server-express");

const patientSchema = gql`
  scalar Date

  type Query {
    patients(
      name: String
      page: Int = 1
      pageSize: Int = 100
      order: Order = "DESC"
    ): PaginatedPatients!
    patient(id: ID!): Patient!
    patientByVisit(visitId: ID!): Patient!
  }

  type Mutation {
    registerPatient(data: PatientInput!): Patient!
    updatePatient(id: ID!, data: PatientInput!): Patient!
    deletePatient(id: ID!): String!
  }

  input PatientInput {
    name: String!
    birthDate: String!
    sex: Gender!
    address: String!
    nextOfKin: String
    religion: Religion!
    maritalStatus: MaritalStatus!
    tribe: String
    occupation: String
    allergies: String
    chronicIllness: String
    mobile: String
    email: String
  }

  type Patient {
    id: ID!
    name: String!
    birthDate: Date!
    sex: Gender!
    address: String!
    nextOfKin: String
    religion: Religion!
    maritalStatus: MaritalStatus!
    tribe: String
    occupation: String
    allergies: String
    chronicIllness: String
    mobile: String
    email: String
    visits: [Visit!]!
    medicalInfo: MedicalInfo # Possibly null
    createdAt: Date!
    updatedAt: Date
  }

  type PaginatedPatients {
    rows: [Patient!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum Religion {
    CATHOLIC
    PROTESTANT
    MOSLEM
    SDA
    PENTECOSTAL
    ORTHODOX
    OTHER
  }

  enum MaritalStatus {
    SINGLE
    MARRIED
    DIVORCED
    COHABITING
    WIDOW
    WIDOWER
    NA
  }
`;

module.exports = patientSchema;
