import { User } from "../../../models";
import { QueryResolvers } from "../../__generated__/typeDefs";

//type ResolveUser = QueryResolvers["users"];
//type ResolveAuthUser = QueryResolvers["user"];

export const resolveUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(err as any);
  }
};

export const resolveUser = async (
  _parent: any,
  _args: any,
  { user } : any
) => {
  try {
    const currentUser = await User.findById(user.id);
    return currentUser;
  } catch (err) {
    throw new Error(err as any);
  }
};
