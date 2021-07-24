const express = require("express");
const mongoose = require("mongoose");

import { ApolloServer } from "apollo-server-express";
import { MONGODB } from "./config";
import schema from "./graphql/schema";

const app = express();

const server = new ApolloServer(schema);

server.applyMiddleware({ app, path: "/graphql" ,   bodyParserConfig: {
  limit:"10mb"
}});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo is connected");
    return app.listen({ port: 8001 });
  })
  .then(() => {
    console.log(`Apollo Server is on http://localhost:8001/graphql`);
  });

//WjoY0FD08h7sQwVD
