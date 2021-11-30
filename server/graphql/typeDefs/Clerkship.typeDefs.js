const { gql } = require("apollo-server-express");

const vitals = gql`
  type Query {
    clerkship(visitId: ID!): Clerkship
  }

  type Mutation {
    saveClerkship(data: ClerkshipInput!): Clerkship!
    updateClerkship(id: ID!, data: ClerkshipUpdates!): Clerkship!
    deleteClerkship(id: ID!): String!
  }

  input ClerkshipInput {
    pc: String!
    hpc: String!
    ros: String
    past_history: String
    jaundice: Jaundice
    pallor: Pallor
    cyanosis: Cyanosis
    clubbing: Clubbing
    oedema: Oedema
    lymphadenopathy: String
    skin: String
    systemic_examination: String!
    diagnosis: String!
    differentials: String
    plan: String!
    visitId: ID!
  }

  input ClerkshipUpdates {
    pc: String
    hpc: String
    ros: String
    past_history: String
    jaundice: Jaundice
    pallor: Pallor
    cyanosis: Cyanosis
    clubbing: Clubbing
    oedema: Oedema
    lymphadenopathy: String
    skin: String
    systemic_examination: String
    diagnosis: String
    differentials: String
    plan: String
  }

  type Clerkship {
    id: ID!
    pc: String!
    hpc: String!
    ros: String
    past_history: String
    jaundice: Jaundice
    pallor: Pallor
    cyanosis: Cyanosis
    clubbing: Clubbing
    oedema: Oedema
    lymphadenopathy: String
    skin: String
    systemic_examination: String!
    diagnosis: String!
    differentials: String
    plan: String!
    createdAt: Date!
    updatedAt: Date!
    doctorId: ID!
    visitId: ID!
  }

  enum Jaundice {
    NONE
    TINGE
    MODERATE
    DEEP
  }

  enum Pallor {
    NONE
    MILD
    MODERATE
    SEVERE
    PAPER_WHITE
  }

  enum Cyanosis {
    NONE
    PERIPHERAL
    CENTRAL
    ACROCYANOSIS
  }

  enum Clubbing {
    NONE
    GRADE_1
    GRADE_2
    GRADE_3
    GRADE_4
    HPOAP
  }

  enum Oedema {
    NONE
    GRADE_1
    GRADE_2
    GRADE_3
    ANARSACA
  }
`;

module.exports = vitals;
