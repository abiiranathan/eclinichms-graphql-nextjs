const { gql } = require("apollo-server-express");

const vitals = gql`
  type Query {
    vitals: [VitalSigns!]!
    vital(id: ID!): VitalSigns
  }

  type Mutation {
    saveVitals(data: VitalsInput!): VitalSigns!
    deleteVitals(id: ID!): String!
  }

  input VitalsInput {
    sbp: Int
    dbp: Int
    pulse: Int!
    temperature: Float
    resp: Int!
    spo2: Int
    weight: Float
    height: Float
    gcs: Int!
    muac: Float
    visitId: ID!
  }

  type VitalSigns {
    id: ID!
    sbp: Int
    dbp: Int
    pulse: Int!
    temperature: Float
    resp: Int!
    spo2: Int
    weight: Float
    height: Float
    gcs: Int!
    muac: Float
    createdAt: Date!
    updatedAt: Date
    user: User!
    visitId: ID!
  }
`;

module.exports = vitals;
