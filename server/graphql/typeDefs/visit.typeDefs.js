const { gql } = require("apollo-server-express");

const types = gql`
  type Query {
    visits(
      name: String
      doctor: ID
      reason: Reason
      page: Int = 1
      pageSize: Int = 50
      ordering: Order = "DESC"
    ): PaginatedVisits!
    visit(id: ID!): Visit!
  }

  type Mutation {
    registerVisit(data: NewVisit!): Visit!
    deleteVisit(id: ID!): String!
  }

  input NewVisit {
    patientId: ID!
    wardId: ID!
    consultationId: ID!
    doctorId: ID!
    reason: Reason!
    department: Department!
    isDischarged: Boolean
  }

  type Visit {
    id: ID!
    patientId: ID!
    wardId: ID!
    userId: ID!
    consultationId: ID!
    department: String!
    reason: String!
    isDischarged: Boolean!
    seenDoctor: Boolean!
    createdAt: Date!
    updatedAt: Date

    # Foreignkeys
    patient: Patient!
    user: User!
    doctor: User!
    consultation: Consultation!
    ward: Ward!
    vitals: [VitalSigns!]!
    clerkship: Clerkship
  }

  type PaginatedVisits {
    rows: [Visit!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  enum Reason {
    CONSULTATION
    LABORATORY_ONLY
    PHARMACY_ONLY
  }

  enum Department {
    OUTPATIENT
    MEDICINE
    SURGERY
    OBSTETRICS
    GYNAECOLOGY
    PAEDIATRICS
  }
`;

module.exports = types;
