import { gql } from "apollo-server-express";

export default gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    username: String!
    name: String!
    surname: String!
    password: String!
    email: String!
    createdAt: String!
  }
`;
