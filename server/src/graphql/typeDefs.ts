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

  type Task {
    id: ID!
    content: String!
    tags: [Tag]!
  }
  type Tag {
    id: ID!
    name: String!
    color: String!
  }

  type AuthtenticatedUser {
    id: ID!
    username: String!
    name: String!
    surname: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
    tasks: [Task]
    tags: [Tag]
  }

  type Query {
    users: [User]
    user: AuthtenticatedUser!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    registerUser(input: RegisterInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;
