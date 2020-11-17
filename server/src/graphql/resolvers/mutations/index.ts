import { resolveRegisterUser, resolveLogin } from "./users";
import { Resolvers } from "../../__generated__/typeDefs";

export const resolvers: Resolvers = {
  Mutation: {
    registerUser: resolveRegisterUser,
    login: resolveLogin,
  },
};
