import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
};

export type GetNameExampleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNameExampleQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);


export const GetNameExampleDocument = gql`
    query getNameExample {
  me {
    username
  }
}
    `;

/**
 * __useGetNameExampleQuery__
 *
 * To run a query within a React component, call `useGetNameExampleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNameExampleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNameExampleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNameExampleQuery(baseOptions?: Apollo.QueryHookOptions<GetNameExampleQuery, GetNameExampleQueryVariables>) {
        return Apollo.useQuery<GetNameExampleQuery, GetNameExampleQueryVariables>(GetNameExampleDocument, baseOptions);
      }
export function useGetNameExampleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNameExampleQuery, GetNameExampleQueryVariables>) {
          return Apollo.useLazyQuery<GetNameExampleQuery, GetNameExampleQueryVariables>(GetNameExampleDocument, baseOptions);
        }
export type GetNameExampleQueryHookResult = ReturnType<typeof useGetNameExampleQuery>;
export type GetNameExampleLazyQueryHookResult = ReturnType<typeof useGetNameExampleLazyQuery>;
export type GetNameExampleQueryResult = Apollo.QueryResult<GetNameExampleQuery, GetNameExampleQueryVariables>;