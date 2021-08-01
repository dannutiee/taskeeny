const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

import { ApolloServer } from "apollo-server-express";
import { MONGODB } from "./config";
import schema from "./graphql/schema";

const app = express();
app.use(
  "/images",
  express.static(path.join(__dirname, "../../../../../images"))
);
app.use(
  express.json({
    limit: "5mb",
  })
);

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
