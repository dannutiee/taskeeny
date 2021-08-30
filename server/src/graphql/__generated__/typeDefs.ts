import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { FileUpload } from "../scalars/FileUpload";
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
  UploadFile: FileUpload;
};

export type AddTaskInput = {
  content: Scalars["String"];
  tags: Array<TagInput>;
  status?: Maybe<Scalars["String"]>;
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
  registerUser?: Maybe<RegisterUserResponse>;
  login?: Maybe<LoginResponse>;
  addTask?: Maybe<AddTaskResponse>;
  updatePositions?: Maybe<UpdatePositionsResponse>;
  deleteTask?: Maybe<DeleteTaskResponse>;
  updateTask?: Maybe<UpdateTaskResponse>;
  updateTag?: Maybe<UpdateTagResponse>;
  setActiveTag?: Maybe<SetActiveTagResponse>;
  setAllTagsVisible?: Maybe<SetAllTagsVisibleResponse>;
  uploadFile?: Maybe<UploadedFileResponse>;
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

export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};

export type MutationSetActiveTagArgs = {
  input: SetActiveTagInput;
};

export type MutationUploadFileArgs = {
  file: Scalars["UploadFile"];
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
  email: Scalars["String"];
  name: Scalars["String"];
  surname: Scalars["String"];
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
};

export type RegisterUserResponse = MutationResponseInterface & {
  __typename?: "RegisterUserResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
  user: User;
};

export type SetActiveTagInput = {
  activeTag: Scalars["String"];
};

export type SetActiveTagResponse = MutationResponseInterface & {
  __typename?: "SetActiveTagResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type SetAllTagsVisibleResponse = MutationResponseInterface & {
  __typename?: "SetAllTagsVisibleResponse";
  code: Scalars["String"];
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  name: Scalars["String"];
  color: Scalars["String"];
  isActive: Scalars["Boolean"];
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
  createdAt: Scalars["String"];
  completedAt?: Maybe<Scalars["String"]>;
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

export type UpdateTagInput = {
  name: Scalars["String"];
  isActive: Scalars["Boolean"];
};

export type UpdateTagResponse = MutationResponseInterface & {
  __typename?: "UpdateTagResponse";
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

export type UploadedFileResponse = {
  __typename?: "UploadedFileResponse";
  filename: Scalars["String"];
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
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Position: ResolverTypeWrapper<Position>;
  Mutation: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  RegisterUserResponse: ResolverTypeWrapper<RegisterUserResponse>;
  MutationResponseInterface:
    | ResolversTypes["RegisterUserResponse"]
    | ResolversTypes["LoginResponse"]
    | ResolversTypes["AddTaskResponse"]
    | ResolversTypes["UpdatePositionsResponse"]
    | ResolversTypes["DeleteTaskResponse"]
    | ResolversTypes["UpdateTaskResponse"]
    | ResolversTypes["UpdateTagResponse"]
    | ResolversTypes["SetActiveTagResponse"]
    | ResolversTypes["SetAllTagsVisibleResponse"];
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  AddTaskInput: AddTaskInput;
  TagInput: TagInput;
  AddTaskResponse: ResolverTypeWrapper<AddTaskResponse>;
  UpdatePositionsInput: UpdatePositionsInput;
  UpdatePositionsResponse: ResolverTypeWrapper<UpdatePositionsResponse>;
  DeleteTaskResponse: ResolverTypeWrapper<DeleteTaskResponse>;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskResponse: ResolverTypeWrapper<UpdateTaskResponse>;
  UpdateTagInput: UpdateTagInput;
  UpdateTagResponse: ResolverTypeWrapper<UpdateTagResponse>;
  SetActiveTagInput: SetActiveTagInput;
  SetActiveTagResponse: ResolverTypeWrapper<SetActiveTagResponse>;
  SetAllTagsVisibleResponse: ResolverTypeWrapper<SetAllTagsVisibleResponse>;
  UploadFile: ResolverTypeWrapper<Scalars["UploadFile"]>;
  UploadedFileResponse: ResolverTypeWrapper<UploadedFileResponse>;
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
  Boolean: Scalars["Boolean"];
  Position: Position;
  Mutation: {};
  RegisterInput: RegisterInput;
  RegisterUserResponse: RegisterUserResponse;
  MutationResponseInterface:
    | ResolversParentTypes["RegisterUserResponse"]
    | ResolversParentTypes["LoginResponse"]
    | ResolversParentTypes["AddTaskResponse"]
    | ResolversParentTypes["UpdatePositionsResponse"]
    | ResolversParentTypes["DeleteTaskResponse"]
    | ResolversParentTypes["UpdateTaskResponse"]
    | ResolversParentTypes["UpdateTagResponse"]
    | ResolversParentTypes["SetActiveTagResponse"]
    | ResolversParentTypes["SetAllTagsVisibleResponse"];
  LoginResponse: LoginResponse;
  AddTaskInput: AddTaskInput;
  TagInput: TagInput;
  AddTaskResponse: AddTaskResponse;
  UpdatePositionsInput: UpdatePositionsInput;
  UpdatePositionsResponse: UpdatePositionsResponse;
  DeleteTaskResponse: DeleteTaskResponse;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskResponse: UpdateTaskResponse;
  UpdateTagInput: UpdateTagInput;
  UpdateTagResponse: UpdateTagResponse;
  SetActiveTagInput: SetActiveTagInput;
  SetActiveTagResponse: SetActiveTagResponse;
  SetAllTagsVisibleResponse: SetAllTagsVisibleResponse;
  UploadFile: Scalars["UploadFile"];
  UploadedFileResponse: UploadedFileResponse;
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
    Maybe<ResolversTypes["RegisterUserResponse"]>,
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
  updateTag?: Resolver<
    Maybe<ResolversTypes["UpdateTagResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagArgs, "input">
  >;
  setActiveTag?: Resolver<
    Maybe<ResolversTypes["SetActiveTagResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSetActiveTagArgs, "input">
  >;
  setAllTagsVisible?: Resolver<
    Maybe<ResolversTypes["SetAllTagsVisibleResponse"]>,
    ParentType,
    ContextType
  >;
  uploadFile?: Resolver<
    Maybe<ResolversTypes["UploadedFileResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileArgs, "file">
  >;
};

export type MutationResponseInterfaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationResponseInterface"] = ResolversParentTypes["MutationResponseInterface"]
> = {
  __resolveType: TypeResolveFn<
    | "RegisterUserResponse"
    | "LoginResponse"
    | "AddTaskResponse"
    | "UpdatePositionsResponse"
    | "DeleteTaskResponse"
    | "UpdateTaskResponse"
    | "UpdateTagResponse"
    | "SetActiveTagResponse"
    | "SetAllTagsVisibleResponse",
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

export type RegisterUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RegisterUserResponse"] = ResolversParentTypes["RegisterUserResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetActiveTagResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SetActiveTagResponse"] = ResolversParentTypes["SetActiveTagResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetAllTagsVisibleResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SetAllTagsVisibleResponse"] = ResolversParentTypes["SetAllTagsVisibleResponse"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  color?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  completedAt?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
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

export type UpdateTagResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateTagResponse"] = ResolversParentTypes["UpdateTagResponse"]
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

export type UploadedFileResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UploadedFileResponse"] = ResolversParentTypes["UploadedFileResponse"]
> = {
  filename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadFileScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UploadFile"], any> {
  name: "UploadFile";
}

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
  RegisterUserResponse?: RegisterUserResponseResolvers<ContextType>;
  SetActiveTagResponse?: SetActiveTagResponseResolvers<ContextType>;
  SetAllTagsVisibleResponse?: SetAllTagsVisibleResponseResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  UpdatePositionsResponse?: UpdatePositionsResponseResolvers<ContextType>;
  UpdateTagResponse?: UpdateTagResponseResolvers<ContextType>;
  UpdateTaskResponse?: UpdateTaskResponseResolvers<ContextType>;
  UploadedFileResponse?: UploadedFileResponseResolvers<ContextType>;
  UploadFile?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
