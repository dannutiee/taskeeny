const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";

const { MONGODB } = require("./config");
var distDir = process.env.production ? __dirname + "/dist/" : "/dist";

const app = express();
app.use("/images", express.static(path.join(distDir, "../../../../../images")));
app.use(
  express.json({
    limit: "5mb",
  })
);

const server = new ApolloServer(schema);
const port = process.env.PORT || 8001;

const graphqlDir = process.env.production ? __dirname + "/graphql" : "/graphql";
server.applyMiddleware({ app, path: graphqlDir });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo is connected");
    return app.listen({ port: port });
  })
  .then(() => {
    console.log(`Apollo Server is on http://localhost:8001/graphql`);
  });

//WjoY0FD08h7sQwVD
