import { ApolloServerExpressConfig } from "apollo-server-express";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";

import { createContext } from "./context";

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers: resolvers as any, // workaround
  // context: ({req})=>({req}),
  context: createContext,
  introspection: true,
  playground: true,
};

export default schema;
