import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import AppRouter from "./routers/AppRouter";
import GraphQLClient from "./graphql";

export default function App(): JSX.Element {
  return (
    <React.Fragment>
      <AppRouter />
    </React.Fragment>
  );
}

const root = document.getElementById("app-root");
ReactDOM.render(
  <ApolloProvider client={GraphQLClient}>
    <App />
  </ApolloProvider>,
  root
);
