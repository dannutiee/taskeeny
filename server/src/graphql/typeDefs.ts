import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    username: String!
    name: String!
    surname: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    name: String!
    surname: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
  }
`;
