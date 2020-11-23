import { Task } from "../../../models/Task";
import { AuthtenticatedUserResolvers } from "../../__generated__/typeDefs";

type ResolveTask = AuthtenticatedUserResolvers["tasks"];

export const resolveTasks: ResolveTask = async (
  _parent,
  _args,
  { isAuth, user }
) => {
  if (isAuth) {
    try {
      const tasks = await Task.find({ user_id: user.id });
      return tasks;
    } catch (err) {
      throw new Error(err);
    }
  }
};
