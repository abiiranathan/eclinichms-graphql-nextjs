const { gql } = require("apollo-server-express");

const types = gql`
  type Query {
    consultations: [Consultation!]!
    consultation(id: ID!): Consultation!
  }

  type Mutation {
    saveConsultation(name: String!, fee: Int!): Consultation!
    updateConsultation(id: ID!, name: String!, fee: Int!): Consultation!
    deleteConsultation(id: ID!): String!
  }

  type Consultation {
    id: ID!
    name: String!
    fee: Int!
  }
`;

module.exports = types;
