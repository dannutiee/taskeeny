import { UserInputError } from "apollo-server";

import { Account } from "../../../models";
import {
  MutationResolvers,
  Tag as TagInterface,
} from "../../__generated__/typeDefs";

type ResolveUpdateTag = MutationResolvers["updateTag"];
type ResolveSetActiveTag = MutationResolvers["setActiveTag"];

export const resolveUpdateTag: ResolveUpdateTag = async (
  _parent,
  { input: { name, isActive } },
  { isAuth, user }
) => {
  if (isAuth) {
    const currentAccount = await Account.findOne({ user_id: user.id });

    // find tag to update
    const tagToUpdate = currentAccount.tags.find((tag: TagInterface) => {
      return tag.name === name;
    });

    if (!tagToUpdate) {
      throw new UserInputError("Tag is not exist");
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

export const resolveSetActiveTag: ResolveSetActiveTag = async (
  _parent,
  { input: { activeTag } },
  { isAuth, user }
) => {
  if (isAuth) {
    const currentAccount = await Account.findOne({ user_id: user.id });

    currentAccount.tags.forEach((tag: TagInterface) =>
      tag.name === activeTag ? (tag.isActive = true) : (tag.isActive = false)
    );

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
