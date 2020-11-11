import { gql } from "apollo-server-express";

export default gql`
  type Query {
    me: User
  }

  type User {
    username: String!
    age: Int
  }
`;
