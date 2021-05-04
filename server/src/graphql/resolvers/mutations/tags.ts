import { UserInputError } from "apollo-server";

import { Account } from "../../../models";
import {
  MutationResolvers,
  Tag as TagInterface,
} from "../../__generated__/typeDefs";

type ResolveUpdateTag = MutationResolvers["updateTag"];

export const resolveUpdateTag: ResolveUpdateTag = async (
  _parent,
  { input: { name, isActive } },
  { isAuth, user }
) => {
  if (isAuth) {
    // update  tasks positions
    const currentAccount = await Account.findOne({ user_id: user.id });

    // find tag to update
    const tagToUpdate = currentAccount.tags.find((tag: TagInterface) => {
      return tag.name === name;
    });

    if (!tagToUpdate) {
      throw new UserInputError("Task is not exist");
    } else {
      tagToUpdate.isActive = isActive;
    }

    const result = await currentAccount.save((err: any) => {
      if (err) {
        return {
          success: false,
          message: err,
        };
      }
    });

    return {
      ...result,
      code: "200",
      success: true,
      message: "Tag succesfully updated",
    };
  }
};
