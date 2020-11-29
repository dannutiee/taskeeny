const mongoose = require("mongoose");
import { UserInputError } from "apollo-server";

import { Account, Task, Tag } from "../../../models";
import {
  MutationResolvers,
  TagInput,
  Tag as TagInterface,
} from "../../__generated__/typeDefs";
import { getOnlyNewTags, getArrOfTagNames } from "../../../utils/tasks";

type ResolveAddTask = MutationResolvers["addTask"];
type ResolveDeleteTask = MutationResolvers["deleteTask"];

interface NewTag extends TagInput {
  tasks?: string[];
}

export const resolveAddTask: ResolveAddTask = async (
  _parent,
  { input: { tags, content } },
  { isAuth, user }
) => {
  if (isAuth) {
    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(),
      content: content,
      status: "todo",
      createdAt: new Date().toISOString(),
      tags: getArrOfTagNames(tags),
    });

    // add task to account
    const currentAccount = await Account.findOne({ user_id: user.id });
    currentAccount.tasks.push(newTask);

    // update  existing tags with new task id
    for (let i = 0; i < currentAccount.tags.length; i++) {
      if (tags.find((el) => el.name === currentAccount.tags[i].name)) {
        currentAccount.tags[i].tasks.push(newTask._id);
      }
    }

    // add tags to account - only these which are not created yet
    const newTags = getOnlyNewTags(tags, currentAccount.tags);
    if (newTags.length > 0) {
      newTags.forEach((newTag: NewTag) => {
        const newTagObject = new Tag({
          name: newTag.name,
          color: newTag.color,
          tasks: [newTask._id],
        });

        currentAccount.tags.push(newTagObject);
      });
    }

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

export const resolveDeleteTask: ResolveDeleteTask = async (
  _parent,
  { taskId },
  { isAuth, user }
) => {
  if (isAuth) {
    const currentAccount = await Account.findOne({ user_id: user.id });

    // find task to remove
    const taskToRemove = currentAccount.tasks.find((task: TagInterface) => {
      return task.id === taskId;
    });

    if (!taskToRemove) {
      throw new UserInputError("Task is not exist");
    }

    // remove task id from all tags it belong to
    for (let tag of currentAccount.tags) {
      const taskIdIndex = tag.tasks.indexOf(taskToRemove.id);
      if (taskIdIndex !== -1) {
        tag.tasks.splice(taskIdIndex, 1);
      }
    }

    // remov tags when there is no tasks connected
    currentAccount.tags = currentAccount.tags.filter(
      (tag: TagInterface) => tag.tasks.length !== 0
    );

    // remove task from db
    currentAccount.tasks = currentAccount.tasks.filter(
      (task: any) => task._id !== taskToRemove._id
    );

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
      message: "Task succesfully deleted",
    };
  }
};
