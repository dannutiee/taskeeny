import { resolveUsers, resolveUser } from "./users";
import { resolveTasks } from "./tasks";
import { Resolvers } from "../../__generated__/typeDefs";

export const resolvers: Resolvers = {
  Query: {
    users: resolveUsers,
    user: resolveUser,
  },
  AuthtenticatedUser: {
    tasks: resolveTasks,
  },
};
