import { User } from "../../../models";
import { QueryResolvers } from "../../__generated__/typeDefs";

type ResolveUser = QueryResolvers["users"];
type ResolveAuthUser = QueryResolvers["user"];

export const resolveUsers: ResolveUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export const resolveUser: ResolveAuthUser = async (
  _parent,
  _args,
  { user }
) => {
  try {
    const currentUser = await User.findById(user.id);
    return currentUser;
  } catch (err) {
    throw new Error(err);
  }
};
