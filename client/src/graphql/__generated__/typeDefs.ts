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
  tasks: Array<Task>;
  tags: Array<Tag>;
  positions?: Maybe<Array<Position>>;
};

export type DeleteTaskResponse = MutationResponseInterface & {
  __typename?: "DeleteTaskResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type LoginResponse = MutationResponseInterface & {
  __typename?: "LoginResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  registerUser?: Maybe<User>;
  login?: Maybe<LoginResponse>;
  addTask?: Maybe<AddTaskResponse>;
  updatePositions?: Maybe<UpdatePositionsResponse>;
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

export type MutationUpdatePositionsArgs = {
  input: UpdatePositionsInput;
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

export type Position = {
  __typename?: "Position";
  status: Scalars["String"];
  tasksOrder: Array<Maybe<Scalars["String"]>>;
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
  tags: Array<Scalars["String"]>;
};

export type UpdatePositionsInput = {
  status: Scalars["String"];
  tasksOrder: Array<Scalars["String"]>;
};

export type UpdatePositionsResponse = MutationResponseInterface & {
  __typename?: "UpdatePositionsResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
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

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars["ID"];
}>;

export type DeleteTaskMutation = { __typename?: "Mutation" } & {
  deleteTask?: Maybe<
    { __typename?: "DeleteTaskResponse" } & Pick<
      DeleteTaskResponse,
      "code" | "success" | "message"
    >
  >;
};

export type GetTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTagsQuery = { __typename?: "Query" } & {
  user: { __typename?: "AuthtenticatedUser" } & {
    tags: Array<{ __typename?: "Tag" } & Pick<Tag, "name" | "color" | "tasks">>;
  };
};

export type GetTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetTasksQuery = { __typename?: "Query" } & {
  user: { __typename?: "AuthtenticatedUser" } & Pick<
    AuthtenticatedUser,
    "id"
  > & {
      tasks: Array<
        { __typename?: "Task" } & Pick<
          Task,
          "id" | "content" | "status" | "tags"
        >
      >;
      positions?: Maybe<
        Array<
          { __typename?: "Position" } & Pick<Position, "status" | "tasksOrder">
        >
      >;
    };
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

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<
    { __typename?: "LoginResponse" } & Pick<
      LoginResponse,
      "code" | "success" | "message"
    > & {
        user: { __typename?: "User" } & Pick<
          User,
          "id" | "name" | "surname" | "email" | "createdAt" | "token"
        >;
      }
  >;
};

export type UpdatePositionsMutationVariables = Exact<{
  input: UpdatePositionsInput;
}>;

export type UpdatePositionsMutation = { __typename?: "Mutation" } & {
  updatePositions?: Maybe<
    { __typename?: "UpdatePositionsResponse" } & Pick<
      UpdatePositionsResponse,
      "code" | "success" | "message"
    >
  >;
};

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;

export type UpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask?: Maybe<
    { __typename?: "UpdateTaskResponse" } & Pick<
      UpdateTaskResponse,
      "code" | "success" | "message"
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
export const DeleteTaskDocument = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      code
      success
      message
    }
  }
`;
export type DeleteTaskMutationFn = Apollo.MutationFunction<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >
) {
  return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(
    DeleteTaskDocument,
    baseOptions
  );
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>;
export type DeleteTaskMutationResult = Apollo.MutationResult<
  DeleteTaskMutation
>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;
export const GetTagsDocument = gql`
  query getTags {
    user {
      tags {
        name
        color
        tasks
      }
    }
  }
`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>
) {
  return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(
    GetTagsDocument,
    baseOptions
  );
}
export function useGetTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>
) {
  return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(
    GetTagsDocument,
    baseOptions
  );
}
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<
  GetTagsQuery,
  GetTagsQueryVariables
>;
export const GetTasksDocument = gql`
  query getTasks {
    user {
      id
      tasks {
        id
        content
        status
        tags
      }
      positions {
        status
        tasksOrder
      }
    }
  }
`;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>
) {
  return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(
    GetTasksDocument,
    baseOptions
  );
}
export function useGetTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTasksQuery,
    GetTasksQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(
    GetTasksDocument,
    baseOptions
  );
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<
  typeof useGetTasksLazyQuery
>;
export type GetTasksQueryResult = Apollo.QueryResult<
  GetTasksQuery,
  GetTasksQueryVariables
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
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      success
      message
      user {
        id
        name
        surname
        email
        createdAt
        token
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UpdatePositionsDocument = gql`
  mutation updatePositions($input: UpdatePositionsInput!) {
    updatePositions(input: $input) {
      code
      success
      message
    }
  }
`;
export type UpdatePositionsMutationFn = Apollo.MutationFunction<
  UpdatePositionsMutation,
  UpdatePositionsMutationVariables
>;

/**
 * __useUpdatePositionsMutation__
 *
 * To run a mutation, you first call `useUpdatePositionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePositionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePositionsMutation, { data, loading, error }] = useUpdatePositionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePositionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePositionsMutation,
    UpdatePositionsMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdatePositionsMutation,
    UpdatePositionsMutationVariables
  >(UpdatePositionsDocument, baseOptions);
}
export type UpdatePositionsMutationHookResult = ReturnType<
  typeof useUpdatePositionsMutation
>;
export type UpdatePositionsMutationResult = Apollo.MutationResult<
  UpdatePositionsMutation
>;
export type UpdatePositionsMutationOptions = Apollo.BaseMutationOptions<
  UpdatePositionsMutation,
  UpdatePositionsMutationVariables
>;
export const UpdateTaskDocument = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      code
      success
      message
    }
  }
`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >
) {
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
    UpdateTaskDocument,
    baseOptions
  );
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult = Apollo.MutationResult<
  UpdateTaskMutation
>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;
