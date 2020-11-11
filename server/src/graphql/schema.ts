import { ApolloServerExpressConfig } from "apollo-server-express";
import { resolvers } from "./resolvers/resolvers";
import typeDefs from "./typeDefs";

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
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
