import { ApolloError } from "@apollo/client";

export const getErrors = (error: ApolloError) => {
  return error.graphQLErrors[0].extensions!.errors;
};
