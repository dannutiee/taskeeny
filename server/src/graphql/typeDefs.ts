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
    status: String
  }

  input UpdatePositionsInput {
    status: String!
    tasksOrder: [String!]!
  }

  input UpdateTaskInput {
    taskId: ID!
    content: String
    tags: [TagInput!]
    status: String
  }

  input UpdateTagInput {
    name: String!
    isActive: Boolean!
  }

  input SetActiveTagInput {
    activeTag: String!
  }

  # Queries   --------------------------------------

  type Task {
    id: ID!
    content: String!
    status: String!
    tags: [String!]!
  }
  type Tag {
    id: ID!
    name: String!
    color: String!
    isActive: Boolean!
    tasks: [String!]!
  }

  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    createdAt: String!
    token: String!
  }

  type Position {
    status: String!
    tasksOrder: [String]!
  }

  type AuthtenticatedUser {
    id: ID!
    name: String!
    surname: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
    tasks: [Task!]!
    tags: [Tag!]!
    positions: [Position!]
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

  type UpdatePositionsResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  type UpdateTaskResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  type UpdateTagResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  type SetActiveTagResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  type DeleteTaskResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  type LoginResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
    user: User!
  }

  type UploadedFileResponse {
    filename: String!
  }

  # Root for mutation and query  ----------------------
  scalar UploadFile

  type Mutation {
    registerUser(input: RegisterInput!): User
    login(email: String!, password: String!): LoginResponse
    addTask(input: AddTaskInput!): AddTaskResponse
    updatePositions(input: UpdatePositionsInput!): UpdatePositionsResponse
    deleteTask(taskId: ID!): DeleteTaskResponse
    updateTask(input: UpdateTaskInput!): UpdateTaskResponse
    updateTag(input: UpdateTagInput!): UpdateTagResponse
    setActiveTag(input: SetActiveTagInput!): SetActiveTagResponse
    uploadFile(file: UploadFile!): UploadedFileResponse
  }
  type Query {
    users: [User]
    user: AuthtenticatedUser!
  }
`;
