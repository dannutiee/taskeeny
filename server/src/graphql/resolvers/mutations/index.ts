import { resolveRegisterUser, resolveLogin } from "./users";
import { resolveAddTask, resolveDeleteTask, resolveUpdateTask } from "./tasks";
import { Resolvers } from "../../__generated__/typeDefs";
import { resolveUpdatePositions } from "./positions";
import { resolveUpdateTag, resolveSetActiveTag } from "./tags";

export const resolvers: Resolvers = {
  Mutation: {
    registerUser: resolveRegisterUser,
    login: resolveLogin,
    addTask: resolveAddTask,
    updatePositions: resolveUpdatePositions,
    deleteTask: resolveDeleteTask,
    updateTask: resolveUpdateTask,
    updateTag: resolveUpdateTag,
    setActiveTag: resolveSetActiveTag,
  },
};
