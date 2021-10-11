// import { Tag } from "../../../models/Tag";
import { Account } from "../../../models";
import {
  TaskResolvers,
  AuthtenticatedUserResolvers,
  Task,
} from "../../__generated__/typeDefs";

type ResolveTagsForTask = TaskResolvers["tags"];

export const resolveTagsForTask: ResolveTagsForTask = async (
  { id, tags },
  _args,
  { isAuth, user }
) => {
  if (isAuth) {
    try {
      const account = await Account.findOne({ user_id: user.id });
      let task = account.tasks.find((el: Task) => el.id === id);
      return task.tags;
    } catch (err) {
      throw new Error(err);
    }
  }
};

type ResolveTagsForUser = AuthtenticatedUserResolvers["tags"];
export const resolveTagsForUser: ResolveTagsForUser = async (
  _parent,
  _args,
  { isAuth, user }
) => {
  if (isAuth) {
    try {
      const account = await Account.findOne({ user_id: user.id });
      return account.tags;
    } catch (err) {
      throw new Error(err);
    }
  }
};
