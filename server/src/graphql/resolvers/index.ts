import { resolvers as queries } from "./queries/index";
import { resolvers as mutations } from "./mutations/index";
import { Resolvers } from "../__generated__/typeDefs";

export const resolvers: Resolvers = {
  ...queries,
  ...mutations,
};
