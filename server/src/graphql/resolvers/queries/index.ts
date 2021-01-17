import { resolveUsers, resolveUser } from "./users";
import { resolveTasks } from "./tasks";
import { resolveTagsForTask, resolveTagsForUser } from "./tags";
import { resolvePositions } from "./positions";
import { Resolvers } from "../../__generated__/typeDefs";

export const resolvers: Resolvers = {
  Query: {
    users: resolveUsers,
    user: resolveUser,
  },
  AuthtenticatedUser: {
    tasks: resolveTasks,
    tags: resolveTagsForUser,
    positions: resolvePositions,
  },
  Task: {
    tags: resolveTagsForTask,
  },
};
