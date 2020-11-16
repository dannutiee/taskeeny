import { resolveUsers } from "./users";
import { Resolvers } from "../../__generated__/typeDefs";

export const resolvers: Resolvers = {
  Query: {
    users: resolveUsers,
  },
};
