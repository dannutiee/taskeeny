import  React from "react";
import  ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import AppContextProvider from "./contexts/AppContext";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({ uri: "https://localhost:8001" });

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link,
  cache
});

export default function App(): JSX.Element {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  );
}

const root = document.getElementById("app-root");
ReactDOM.render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
 root);
