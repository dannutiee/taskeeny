import { gql } from "apollo-server-express";

export default gql`
  # Inputs  -----------------------------------

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    name: String!
    surname: String!
  }

  input TagInput {
    name: String!
    color: String!
  }

  input AddTaskInput {
    content: String!
    tags: [TagInput!]!
  }

  # Queries   --------------------------------------

  type Task {
    id: ID!
    content: String!
    status: String!
    tags: [String]
  }
  type Tag {
    id: ID!
    name: String!
    color: String!
  }

  type User {
    id: ID!
    name: String!
    surname: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
  }

  type AuthtenticatedUser {
    id: ID!
    name: String!
    surname: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
    tasks: [Task]
    tags: [Tag]
  }

  # Mutations   -----------------------------

  interface MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  type AddTaskResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  # Root for mutation and query  ----------------------

  type Mutation {
    registerUser(input: RegisterInput!): User
    login(email: String!, password: String!): User
    addTask(input: AddTaskInput!): AddTaskResponse
  }
  type Query {
    users: [User]
    user: AuthtenticatedUser!
  }
`;
