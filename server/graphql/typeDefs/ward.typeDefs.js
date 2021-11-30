const { gql } = require("apollo-server-express");

const types = gql`
  type Query {
    wards: [Ward!]!
    ward(id: ID!): Ward!
  }

  type Mutation {
    saveWard(name: String!): Ward!
    updateWard(id: ID!, name: String!): Ward!
    deleteWard(id: ID!): String!
  }

  type Ward {
    id: ID!
    name: String!
  }
`;

module.exports = types;
