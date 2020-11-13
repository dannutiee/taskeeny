import express from "express";
import { ApolloServer } from "apollo-server-express";
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
import schema from "./graphql/schema";

const app = express();

const server = new ApolloServer(schema);

server.applyMiddleware({ app, path: "/graphql" });

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
