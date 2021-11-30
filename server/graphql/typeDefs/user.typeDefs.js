const { gql } = require("apollo-server-express");

const userSchema = gql`
  type Query {
    users(role: UserRole): [User!]
    user(id: ID!): User!
    currentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
    registerUser(user: RegisterInput!): LoginResponse!
    updateUser(id: ID!, user: UserUpdates!): User!
    deleteUser(id: ID!): String!
  }

  input UserUpdates {
    name: String
    username: String
    email: String
    mobile: String
    age: Int
  }

  input RegisterInput {
    name: String!
    age: Int!
    username: String!
    email: String!
    password: String!
    mobile: String!
    sex: Gender!
    role: UserRole!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    mobile: String!
    age: Int!
    sex: Gender!
    role: UserRole!
    isAdmin: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type LoginResponse {
    user: User!
    token: String!
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum UserRole {
    ADMIN
    DOCTOR
    NURSE
    MIDWIFE
    ACCOUNTS
    LAB
    RADIOLOGY
    PHARMACY
    STORE
  }
`;

module.exports = userSchema;

/* 

type Permissions {
    VISITS: Boolean
    TRIAGE: Boolean
    HISTORY: Boolean
    EXAMINATION: Boolean
    DIAGNOSIS: Boolean
    LAB_REQUESTS: Boolean
    PRESCRIPTIONS: Boolean
    PROCEDURES: Boolean
    LAB_REPORTS: Boolean
    TEST_UPLOAD: Boolean
    RADIOLOGY_REPORTS: Boolean
    DISPENSE_LOGS: Boolean
    PATIENT_BILLS: Boolean
    PAYMENTS: Boolean
  }

*/
