const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    requests(visitId: ID): [Request!]!
    request(id: ID!): Request!
    labrequest(id: ID!): LabRequest!
    labrequests(
      visitId: ID
      page: Int = 1
      pageSize: Int = 50
      order: Order = "ASC"
    ): PaginatedLabRequests!
    items(type: ItemType, name: String, page: Int = 1, pageSize: Int = 50): PaginatedItems!
  }

  type Mutation {
    saveRequest(visitId: ID!, tests: [ID!]!): [Request!]!
    deleteRequest(id: ID!): String!
    saveReport(requestId: ID!, report: String!): Request!
  }

  enum Order {
    ASC
    DESC
  }

  type PaginatedLabRequests {
    rows: [LabRequest!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  type PaginatedItems {
    rows: [Item!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  type Item {
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

  type Request {
    id: ID!
    test: Item!
    visitId: ID!
    report: String!
    requestedBy: String!
    reportedBy: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type LabRequest {
    id: ID!
    test: Item!
    visit: VisitWithPatient!
    patient: Patient!
    report: String!
    requestedBy: String!
    reportedBy: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type VisitWithPatient {
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
    patient: Patient!
  }
`;

module.exports = typeDefs;
