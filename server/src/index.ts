import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from "./graphql/schema";

const app = express();
 
const server = new ApolloServer(schema);
 
server.applyMiddleware({ app, path: '/graphql' });
 
app.listen({ port: 8001 }, () => {
  console.log('Apollo Server is on http://localhost:8001/graphql');
});