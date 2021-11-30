const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    consumables(visitId: ID): [Consumable!]!
    consumable(id: ID!): Consumable!
  }

  type Mutation {
    saveConsumables(visitId: ID!, consumables: [ConsumableInput!]!): [Consumable!]!
    deleteConsumable(id: ID!): String!
  }

  input ConsumableInput {
    consumableId: ID!
    quantityUsed: Int!
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

  type Consumable {
    id: ID!
    consumable: Item!
    visitId: ID!
    quantityUsed: Int!
    registeredBy: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;

module.exports = typeDefs;
