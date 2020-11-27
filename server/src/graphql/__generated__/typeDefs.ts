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
  tasks?: Maybe<Array<Maybe<Task>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  registerUser?: Maybe<User>;
  login?: Maybe<User>;
  addTask?: Maybe<AddTaskResponse>;
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
  Mutation: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  AddTaskInput: AddTaskInput;
  TagInput: TagInput;
  AddTaskResponse: ResolverTypeWrapper<AddTaskResponse>;
  MutationResponseInterface: ResolversTypes["AddTaskResponse"];
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
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
  Mutation: {};
  RegisterInput: RegisterInput;
  AddTaskInput: AddTaskInput;
  TagInput: TagInput;
  AddTaskResponse: AddTaskResponse;
  MutationResponseInterface: ResolversParentTypes["AddTaskResponse"];
  Boolean: Scalars["Boolean"];
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
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Task"]>>>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Tag"]>>>,
    ParentType,
    ContextType
  >;
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
    Maybe<ResolversTypes["User"]>,
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
};

export type MutationResponseInterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationResponseInterface"] = ResolversParentTypes["MutationResponseInterface"]
> = {
  __resolveType: TypeResolveFn<"AddTaskResponse", ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddTaskResponse?: AddTaskResponseResolvers<ContextType>;
  AuthtenticatedUser?: AuthtenticatedUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponseInterface?: MutationResponseInterfaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
