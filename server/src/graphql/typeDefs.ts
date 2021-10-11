import { gql } from "apollo-server-express";

export default gql`
  # Inputs  -----------------------------------

  input RegisterInput {
    email: String!
    name: String!
    surname: String!
    password: String!
    confirmPassword: String!
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
    isActive: Boolean
    color: String
  }

  input UpdateTagsInput {
    tags: [TagInput!]!
  }

  input SetActiveTagInput {
    activeTag: String!
  }

  # Queries   --------------------------------------

  type Task {
    id: ID!
    content: String!
    status: String!
    createdAt: String!
    completedAt: String
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
  type TagWithStatus {
    name: String!
    isActive: Boolean!
  }

  type UpdateTagResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
    tag: TagWithStatus!
  }

  type TagWithColor {
    name: String!
    color: String!
  }

  type UpdateTagsResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
    tags: [TagWithColor!]!
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

  type RegisterUserResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
    user: User!
  }

  type SetAllTagsVisibleResponse implements MutationResponseInterface {
    code: String!
    success: Boolean!
    message: String!
  }

  # Root for mutation and query  ----------------------

  type Mutation {
    registerUser(input: RegisterInput!): RegisterUserResponse
    login(email: String!, password: String!): LoginResponse
    addTask(input: AddTaskInput!): AddTaskResponse
    updatePositions(input: UpdatePositionsInput!): UpdatePositionsResponse
    deleteTask(taskId: ID!): DeleteTaskResponse
    updateTask(input: UpdateTaskInput!): UpdateTaskResponse
    updateTag(input: UpdateTagInput!): UpdateTagResponse
    updateTags(input: UpdateTagsInput!): UpdateTagsResponse
    setActiveTag(input: SetActiveTagInput!): SetActiveTagResponse
    setAllTagsVisible: SetAllTagsVisibleResponse
  }
  type Query {
    users: [User]
    user: AuthtenticatedUser!
  }
`;
