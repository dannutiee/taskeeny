import { UserInputError } from "apollo-server";

import { Account } from "../../../models";
import {
  MutationResolvers,
  Tag,
  Tag as TagInterface,
} from "../../__generated__/typeDefs";

type ResolveUpdateTag = MutationResolvers["updateTag"];
type ResolveUpdateTags = MutationResolvers["updateTags"];
type ResolveSetActiveTag = MutationResolvers["setActiveTag"];
type ResolveSetAllTagsVisible = MutationResolvers["setAllTagsVisible"];

export const resolveUpdateTag: ResolveUpdateTag = async (
  _parent,
  { input: { name, isActive = null, color } },
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
      if (isActive !== null) {
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
      tag: {
        name,
        isActive,
      },
    };
  }
};

export const resolveUpdateTags: ResolveUpdateTags = async (
  _parent,
  { input: { tags = [] } },
  { isAuth, user }
) => {
  if (isAuth) {
    const currentAccount = await Account.findOne({ user_id: user.id });

    currentAccount.tags.map((existingTag: TagInterface) => {
      const newColor = tags.find((tag) => tag.name === existingTag.name)?.color;
      existingTag.color = newColor || existingTag.color;

      return existingTag;
    });

    currentAccount.markModified("tags");

    const result = currentAccount.save((err: any, doc: any) => {
      if (err) {
        return {
          success: false,
          message: err,
        };
      }
      return doc;
    });

    return {
      ...result,
      code: "200",
      success: true,
      message: "Tags succesfully updated",
      tags: result.tags.map((tag: Tag) => ({
        name: tag.name,
        color: tag.color,
      })),
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
    const areAllVisible = !currentAccount.tags.find(
      (tag: TagInterface) => tag.isActive === false
    );
    currentAccount.tags.map((tag: TagInterface) => {
      if (areAllVisible) {
        tag.isActive = false;
      } else {
        tag.isActive = true;
      }
    });

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
