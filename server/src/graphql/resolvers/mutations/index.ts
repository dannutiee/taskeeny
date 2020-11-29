import { resolveRegisterUser, resolveLogin } from "./users";
import { resolveAddTask, resolveDeleteTask, resolveUpdateTask } from "./tasks";
import { Resolvers } from "../../__generated__/typeDefs";

export const resolvers: Resolvers = {
  Mutation: {
    registerUser: resolveRegisterUser,
    login: resolveLogin,
    addTask: resolveAddTask,
    deleteTask: resolveDeleteTask,
    updateTask: resolveUpdateTask,
  },
};
