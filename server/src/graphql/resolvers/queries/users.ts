import { Users } from "../../../models";
import { QueryResolvers } from "../../__generated__/typeDefs";

type ResolveUser = QueryResolvers["users"];

export const resolveUsers: ResolveUser = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
