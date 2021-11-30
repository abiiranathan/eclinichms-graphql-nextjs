const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    inventory(
      type: String
      name: String
      page: Int
      pageSize: Int
      available: Boolean
      expired: Boolean
    ): PaginatedInventory!
  }

  type Mutation {
    updateInventoryQuantity(inventoryId: ID!, newQuantity: Int!): Inventory!
  }

  type PaginatedInventory {
    rows: [Inventory!]!
    count: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
  }

  type Inventory {
    id: ID!
    item: Item!
    quantity: Int!
    expiryDate: Date
    createdAt: Date!
    updatedAt: Date!
  }
`;

module.exports = typeDefs;
