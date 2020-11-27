import { Account } from "../../../models";
import { AuthtenticatedUserResolvers } from "../../__generated__/typeDefs";

type ResolveTask = AuthtenticatedUserResolvers["tasks"];

export const resolveTasks: ResolveTask = async (
  _parent,
  _args,
  { isAuth, user }
) => {
  if (isAuth) {
    try {
      const account = await Account.findOne({ user_id: user.id });
      return account.tasks;
    } catch (err) {
      throw new Error(err);
    }
  }
};
