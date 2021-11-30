const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    # Have no patient details
    prescriptions(visitId: ID): [Prescription!]!
    prescription(id: ID!): Prescription!

    # Pharmacy prescriptions have patient details
    pharmacyPrescriptions(
      visitId: ID
      name: String
      page: Int = 1
      pageSize: Int = 100
      order: Order = "DESC"
    ): PaginatedPrescriptions!
    pharmacyPrescription(id: ID!): PharmacyPrescription!
  }

  type Mutation {
    # By doctor
    savePrescription(visitId: ID!, prescriptions: [InsertPrescriptionData!]!): [Prescription!]!
    updatePrescription(prescriptionId: ID!, prescription: UpdatePrescriptionData!): Prescription!
    deletePrescription(id: ID!): String!

    # From pharmacy
    updatePharmacyPrescription(prescriptionId: ID!, issued: Int!): PharmacyPrescription!
    stopPrescription(prescriptionId: ID!): String!
  }

  input InsertPrescriptionData {
    route: Route!
    drugId: ID!
    dose: String!
    frequency: String!
    duration: Int!
    quantity: Int!
    instructions: String
    total_doses: Int!
  }

  input UpdatePrescriptionData {
    route: Route
    dose: String
    frequency: String
    duration: Int
    quantity: Int
    instructions: String
    total_doses: Int
  }

  type Drug {
    id: ID!
    name: String!
    cost: Int!
    type: ItemType
  }

  enum ItemType {
    TEST
    DRUG
    PROCEDURE
    CONSUMABLE
  }

  type Prescription {
    id: ID!
    visitId: ID!
    route: String!
    drug: Item!
    dose: String!
    frequency: String!
    duration: String!
    quantity: Int!
    issued: Int!
    instructions: String
    total_doses: Int!
    stopped: Boolean!
    doctor: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type PaginatedPrescriptions {
    rows: [PharmacyPrescription!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  type PharmacyPrescription {
    id: ID!
    visitId: ID!
    patient: Patient!
    route: String!
    drug: Item!
    dose: String!
    frequency: String!
    duration: String!
    quantity: Int!
    issued: Int!
    instructions: String
    total_doses: Int!
    stopped: Boolean!
    doctor: String!
    issuedBy: String
    createdAt: Date!
    updatedAt: Date!
  }

  enum Route {
    PO
    IV
    IM
    SUBLINGAL
    TOPICAL
    BUCCAL
    IT
    EPIDURAL
    EPICUTANEOUS
    ENEMA
    PR
    PV
    IO
    INTRAOCCULAR
    TRANSDERMAL
    INHALATIONAL
    INTRADERMAL
    SUBDERMAL
    SUBCUTANEOUS
    INTRAARTUCULAR
    INTRAPERITONEAL
  }
`;

module.exports = typeDefs;
