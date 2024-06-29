import { createContext } from "./context";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";

const schema = {
  typeDefs,
  resolvers: resolvers as any, // workaround
  context: createContext,
  introspection: true,
  playground: true,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
};

export default schema;
