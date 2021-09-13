import { UserInputError } from "apollo-server";

import { Account } from "../../../models";
import {
  MutationResolvers,
  Tag as TagInterface,
} from "../../__generated__/typeDefs";

type ResolveUpdateTag = MutationResolvers["updateTag"];
type ResolveSetActiveTag = MutationResolvers["setActiveTag"];
type ResolveSetAllTagsVisible = MutationResolvers["setAllTagsVisible"];

export const resolveUpdateTag: ResolveUpdateTag = async (
  _parent,
  { input: { name, isActive, color } },
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
      if (isActive) {
        tagToUpdate.isActive = isActive;
      }
      if (color) {
        tagToUpdate.color = color;
      }
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

export const resolveSetAllTagsVisible: ResolveSetAllTagsVisible = async (
  _parent,
  {},
  { isAuth, user }
) => {
  if (isAuth) {
    const currentAccount = await Account.findOne({ user_id: user.id });

    // set all active
    currentAccount.tags.map((tag: TagInterface) => {
      tag.isActive = true;
    });

    console.log("currentAccount.tags======>", currentAccount.tags);

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
      message: "Tags succesfully marked as active",
    };
  }
};
