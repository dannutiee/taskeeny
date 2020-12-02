import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddTaskInput = {
  content: Scalars["String"];
  tags: Array<TagInput>;
};

export type AddTaskResponse = MutationResponseInterface & {
  __typename?: "AddTaskResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type AuthtenticatedUser = {
  __typename?: "AuthtenticatedUser";
  id: Scalars["ID"];
  name: Scalars["String"];
  surname: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  token: Scalars["String"];
  tasks?: Maybe<Array<Maybe<Task>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type DeleteTaskResponse = MutationResponseInterface & {
  __typename?: "DeleteTaskResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  registerUser?: Maybe<User>;
  login?: Maybe<User>;
  addTask?: Maybe<AddTaskResponse>;
  deleteTask?: Maybe<DeleteTaskResponse>;
  updateTask?: Maybe<UpdateTaskResponse>;
};

export type MutationRegisterUserArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationAddTaskArgs = {
  input: AddTaskInput;
};

export type MutationDeleteTaskArgs = {
  taskId: Scalars["ID"];
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type MutationResponseInterface = {
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  users?: Maybe<Array<Maybe<User>>>;
  user: AuthtenticatedUser;
};

export type RegisterInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  surname: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  name: Scalars["String"];
  color: Scalars["String"];
  tasks: Array<Scalars["String"]>;
};

export type TagInput = {
  name: Scalars["String"];
  color: Scalars["String"];
};

export type Task = {
  __typename?: "Task";
  id: Scalars["ID"];
  content: Scalars["String"];
  status: Scalars["String"];
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type UpdateTaskInput = {
  taskId: Scalars["ID"];
  content?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<TagInput>>;
  status?: Maybe<Scalars["String"]>;
};

export type UpdateTaskResponse = MutationResponseInterface & {
  __typename?: "UpdateTaskResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  surname: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  token: Scalars["String"];
};

export type AddTaskMutationVariables = Exact<{
  input: AddTaskInput;
}>;

export type AddTaskMutation = { __typename?: "Mutation" } & {
  addTask?: Maybe<
    { __typename?: "AddTaskResponse" } & Pick<
      AddTaskResponse,
      "code" | "success" | "message"
    >
  >;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: "Query" } & {
  users?: Maybe<
    Array<
      Maybe<
        { __typename?: "User" } & Pick<
          User,
          "id" | "name" | "surname" | "email" | "createdAt"
        >
      >
    >
  >;
};

export const AddTaskDocument = gql`
  mutation addTask($input: AddTaskInput!) {
    addTask(input: $input) {
      code
      success
      message
    }
  }
`;
export type AddTaskMutationFn = Apollo.MutationFunction<
  AddTaskMutation,
  AddTaskMutationVariables
>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTaskMutation,
    AddTaskMutationVariables
  >
) {
  return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(
    AddTaskDocument,
    baseOptions
  );
}
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<
  AddTaskMutation,
  AddTaskMutationVariables
>;
export const GetUsersDocument = gql`
  query getUsers {
    users {
      id
      name
      surname
      email
      createdAt
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
