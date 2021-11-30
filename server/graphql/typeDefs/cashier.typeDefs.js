const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    payments(
      visitId: ID
      billType: PaymentType
      name: String
      page: Int = 1
      pageSize: Int = 200
    ): PaginatedPayments!
    payment(id: ID!): Payment!
    patientBill(visitId: ID!): BillingInfo!
  }

  type Mutation {
    createMiscellaneousBill(data: MiscellaneousBillInput!): MiscBillItem!
    savePayment(data: [PaymentInput]!): [Payment!]!
    cancelPayment(data: [ID]!): String!
  }

  type PaginatedPayments {
    rows: [Payment!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  type Payment {
    id: ID!
    visitId: ID!
    clientName: String!
    itemId: ID!
    itemName: String!
    amountPaid: Int!
    type: PaymentType!
    cashier: String!
  }

  input PaymentInput {
    visitId: ID!
    clientName: String!
    itemId: ID!
    itemName: String!
    amountPaid: Int!
    type: PaymentType!
  }

  type MiscBillItem {
    type: MiscBillType!
    visitId: ID!
    clientName: String!
    cost: Int!
  }

  input MiscellaneousBillInput {
    type: MiscBillType!
    visitId: ID!
    clientName: String!
    cost: Int!
  }

  type Refund {
    paymentId: ID!
    visitId: ID!
    itemId: ID!
    clientName: String!
    itemName: String!
    amountPaid: Int!
    type: PaymentType!
    cashier: String!
    cancelledBy: String!
  }

  enum PaymentType {
    CONSULTATION
    LABORATORY
    PRESCRIPTIONS
    PROCEDURES
    CONSUMABLES
    MISCELLANEOUS
  }

  enum MiscBillType {
    ACCOMMODATION
    NURSING_CARE
    MEDICAL_REVIEWS
    EXAMINATION
    OUT_OF_POCKET
    STAMP_DUTY
    MISCELLANEOUS
  }

  type BillingInfo {
    consultation: ConsultationBill
    laboratory: LaboratoryBill
    prescriptions: PrescriptionBill
    procedures: ProcedureBill
    consumables: ConsumablesBill
    miscellaneous: MiscellaneousBill
  }

  type ConsultationBill {
    total: Int!
    data: Consultation!
  }

  type LaboratoryBill {
    total: Int!
    data: [Request!]!
  }

  type PrescriptionBill {
    total: Int!
    data: [Prescription!]!
  }

  type ProcedureBill {
    total: Int!
    data: [Procedure!]!
  }

  type ConsumablesBill {
    total: Int!
    data: [Consumable!]!
  }

  type MiscellaneousBill {
    total: Int!
    data: [MiscBillItem!]!
  }
`;

module.exports = typeDefs;
