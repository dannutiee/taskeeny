import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/client";

import AppRouter from "./routers/AppRouter";
import globalStyles from "./themes/globalStyle";
import GraphQLClient from "./graphql";

const GlobalStyle = createGlobalStyle`
  ${globalStyles}
`;

export default function App(): JSX.Element {
  return (
    <React.Fragment>
      <GlobalStyle />
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
