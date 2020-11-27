const mongoose = require("mongoose");

import { Account, Task } from "../../../models";
import { MutationResolvers } from "../../__generated__/typeDefs";
import { getFilteredTags } from "../../../utils/tasks";

type ResolveAddTask = MutationResolvers["addTask"];

export const resolveAddTask: ResolveAddTask = async (
  _parent,
  { input: { tags, content } },
  { isAuth, user }
) => {
  if (isAuth) {
    const stringTags: String[] = [];
    tags.forEach((el: any) => {
      stringTags.push(el.name);
    });

    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(),
      content: content,
      status: "todo",
      createdAt: new Date().toISOString(),
      tags: [...stringTags],
    });

    const currentAccount = await Account.findOne({ user_id: user.id });
    currentAccount.tasks.push(newTask);

    const filteredTags = getFilteredTags(tags, currentAccount.tags);
    currentAccount.tags.push(...filteredTags);

    const result = await currentAccount.save((err: any) => {
      if (err) {
        return {
          success: false,
          message: err.errors.message,
        };
      }
    });

    return {
      ...result,
      code: "200",
      success: true,
      message: "Tasks succesfully created",
    };
  }
};
