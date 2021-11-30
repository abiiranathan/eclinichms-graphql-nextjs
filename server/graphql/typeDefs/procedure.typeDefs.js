const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    procedures(visitId: ID): [Procedure!]!
    procedure(id: ID!): Procedure!
  }

  type Mutation {
    saveProcedures(visitId: ID!, procedures: [ID!]!): [Procedure!]!
    deleteProcedure(id: ID!): String!
    saveProcedureNotes(procedureId: ID!, notes: String!): Procedure!
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

  type Procedure {
    id: ID!
    procedure: Item!
    visitId: ID!
    patient: Patient!
    doctor: String!
    reportedBy: String!
    notes: String
    dateReported: Date
    createdAt: Date!
    updatedAt: Date!
  }
`;

module.exports = typeDefs;
