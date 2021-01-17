import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  AuthtenticatedUser: ResolverTypeWrapper<AuthtenticatedUser>;
  Task: ResolverTypeWrapper<Task>;
  Tag: ResolverTypeWrapper<Tag>;
  Position: ResolverTypeWrapper<Position>;
  Mutation: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  MutationResponseInterface:
    | ResolversTypes["LoginResponse"]
    | ResolversTypes["AddTaskResponse"]
    | ResolversTypes["UpdatePositionsResponse"]
    | ResolversTypes["DeleteTaskResponse"]
    | ResolversTypes["UpdateTaskResponse"];
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  AddTaskInput: AddTaskInput;
  TagInput: TagInput;
  AddTaskResponse: ResolverTypeWrapper<AddTaskResponse>;
  UpdatePositionsInput: UpdatePositionsInput;
  UpdatePositionsResponse: ResolverTypeWrapper<UpdatePositionsResponse>;
  DeleteTaskResponse: ResolverTypeWrapper<DeleteTaskResponse>;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskResponse: ResolverTypeWrapper<UpdateTaskResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  AuthtenticatedUser: AuthtenticatedUser;
  Task: Task;
  Tag: Tag;
  Position: Position;
  Mutation: {};
  RegisterInput: RegisterInput;
  LoginResponse: LoginResponse;
  MutationResponseInterface:
    | ResolversParentTypes["LoginResponse"]
    | ResolversParentTypes["AddTaskResponse"]
    | ResolversParentTypes["UpdatePositionsResponse"]
    | ResolversParentTypes["DeleteTaskResponse"]
    | ResolversParentTypes["UpdateTaskResponse"];
  Boolean: Scalars["Boolean"];
  AddTaskInput: AddTaskInput;
  TagInput: TagInput;
  AddTaskResponse: AddTaskResponse;
  UpdatePositionsInput: UpdatePositionsInput;
  UpdatePositionsResponse: UpdatePositionsResponse;
  DeleteTaskResponse: DeleteTaskResponse;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskResponse: UpdateTaskResponse;
};

export type AddTaskResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AddTaskResponse"] = ResolversParentTypes["AddTaskResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthtenticatedUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AuthtenticatedUser"] = ResolversParentTypes["AuthtenticatedUser"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes["Task"]>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["Tag"]>, ParentType, ContextType>;
  positions?: Resolver<
    Maybe<Array<ResolversTypes["Position"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteTaskResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DeleteTaskResponse"] = ResolversParentTypes["DeleteTaskResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LoginResponse"] = ResolversParentTypes["LoginResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  registerUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterUserArgs, "input">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["LoginResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  addTask?: Resolver<
    Maybe<ResolversTypes["AddTaskResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddTaskArgs, "input">
  >;
  updatePositions?: Resolver<
    Maybe<ResolversTypes["UpdatePositionsResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePositionsArgs, "input">
  >;
  deleteTask?: Resolver<
    Maybe<ResolversTypes["DeleteTaskResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTaskArgs, "taskId">
  >;
  updateTask?: Resolver<
    Maybe<ResolversTypes["UpdateTaskResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, "input">
  >;
};

export type MutationResponseInterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationResponseInterface"] = ResolversParentTypes["MutationResponseInterface"]
> = {
  __resolveType: TypeResolveFn<
    | "LoginResponse"
    | "AddTaskResponse"
    | "UpdatePositionsResponse"
    | "DeleteTaskResponse"
    | "UpdateTaskResponse",
    ParentType,
    ContextType
  >;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type PositionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Position"] = ResolversParentTypes["Position"]
> = {
  status?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tasksOrder?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<
    ResolversTypes["AuthtenticatedUser"],
    ParentType,
    ContextType
  >;
};

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  color?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePositionsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdatePositionsResponse"] = ResolversParentTypes["UpdatePositionsResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTaskResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateTaskResponse"] = ResolversParentTypes["UpdateTaskResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddTaskResponse?: AddTaskResponseResolvers<ContextType>;
  AuthtenticatedUser?: AuthtenticatedUserResolvers<ContextType>;
  DeleteTaskResponse?: DeleteTaskResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponseInterface?: MutationResponseInterfaceResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  UpdatePositionsResponse?: UpdatePositionsResponseResolvers<ContextType>;
  UpdateTaskResponse?: UpdateTaskResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
