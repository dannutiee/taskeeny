import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
// import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://localhost:8001/graphql",
  credentials: "same-origin",
});

const uploadLink = createUploadLink({ uri: "http://localhost:8001/graphql" });

//TODO  try to connect onErrorLinks

// const onErrorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(() => {
    const token = localStorage.getItem("jwtToken");

    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return forward(operation);
});

// const getLinks = (): ApolloLink => {
//   const links = [onErrorLink, httpLink, authLink];
//   return ApolloLink.from(links);
// };

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink, uploadLink]),
  cache,
});

export default client;

export * from "./__generated__/typeDefs";
