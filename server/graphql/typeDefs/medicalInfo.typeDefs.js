const { gql } = require("apollo-server-express");

const medicalInfo = gql`
  type Query {
    medicalInfo(patientId: ID!): MedicalInfo
  }

  type Mutation {
    saveMedicalInfo(data: MedicalInfoInput!): MedicalInfo!
    updateMedicalInfo(id: ID!, data: MedicalInfoInput!): MedicalInfo!
    deleteMedicalInfo(id: ID!): String!
  }

  type MedicalInfo {
    id: ID!
    hypertension: Boolean!
    diabetes: Boolean!
    hiv: HivStatus!
    cancer: Boolean!
    heart_disease: Boolean!
    liver_disease: Boolean!
    smoking: Boolean!
    alcohol: Boolean!
    sickle_cell: Boolean!
    allergies: String
    medication: String
    previous_surgery: String
    pregnancy: PregnancyStatus!
    createdAt: Date!
    updatedAt: Date!
    patientId: ID!
  }

  input MedicalInfoInput {
    hypertension: Boolean!
    diabetes: Boolean!
    hiv: HivStatus!
    cancer: Boolean!
    heart_disease: Boolean!
    liver_disease: Boolean!
    smoking: Boolean!
    alcohol: Boolean!
    sickle_cell: Boolean!
    allergies: String
    medication: String
    previous_surgery: String
    pregnancy: PregnancyStatus!
    patientId: ID!
  }

  enum PregnancyStatus {
    NOT_APPLICABLE
    FIRST_TRIMESTER
    SECOND_TRIMESTER
    THIRD_TRIMESTER
    PEURPERIUM
  }

  enum HivStatus {
    UNKNOWN
    NEGATIVE
    POSITIVE
  }
`;

module.exports = medicalInfo;
