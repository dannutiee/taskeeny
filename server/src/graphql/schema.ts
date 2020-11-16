import { ApolloServerExpressConfig } from "apollo-server-express";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers: resolvers as any, // workaround
  introspection: true,
  context: async ({ req, connection, payload }: any) => {
    if (connection) {
      return { isAuth: payload.authToken };
    }
    return { isAuth: req.isAuth };
  },
  playground: true,
};

export default schema;
