import { Tag } from "../../../models/Tag";
import {
  TaskResolvers,
  AuthtenticatedUserResolvers,
} from "../../__generated__/typeDefs";

type ResolveTagsForTask = TaskResolvers["tags"];

export const resolveTagsForTask: ResolveTagsForTask = async (
  { id },
  _args,
  { isAuth }
) => {
  if (isAuth) {
    try {
      const tags = await Tag.find({ task_id: id });
      return tags;
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
      const tags = await Tag.find({ user_id: user.id });
      return tags;
    } catch (err) {
      throw new Error(err);
    }
  }
};
