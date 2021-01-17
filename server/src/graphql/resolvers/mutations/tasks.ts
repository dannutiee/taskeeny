const mongoose = require("mongoose");
import { UserInputError } from "apollo-server";

import { Account, Task } from "../../../models";
import {
  MutationResolvers,
  Tag as TagInterface,
} from "../../__generated__/typeDefs";
import {
  getOnlyNewTags,
  getArrOfTagNames,
  getTagsWithUpdatedTasksIds,
  getTagsUpdatedWithNewItems,
  getTagsWithRemovedTaskId,
} from "../../../utils/tasks";

type ResolveAddTask = MutationResolvers["addTask"];
type ResolveDeleteTask = MutationResolvers["deleteTask"];
type ResolveUpdateTask = MutationResolvers["updateTask"];

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
    currentAccount.tags = getTagsWithUpdatedTasksIds(
      tags,
      currentAccount.tags,
      newTask._id
    );

    // add tags to account - only these which are not created yet
    const newTags = getOnlyNewTags(tags, currentAccount.tags);
    currentAccount.tags = getTagsUpdatedWithNewItems(
      newTags,
      currentAccount.tags,
      newTask._id
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
    const taskToRemove = await currentAccount.tasks.find(
      (task: TagInterface) => {
        return task.id === taskId;
      }
    );

    if (!taskToRemove) {
      throw new UserInputError("Task is not exist");
    }

    // remove task id from all tags it belong to
    currentAccount.tags = getTagsWithRemovedTaskId(
      currentAccount.tags,
      taskToRemove.id
    );

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

export const resolveUpdateTask: ResolveUpdateTask = async (
  _parent,
  { input: { taskId, content, tags, status } },
  { isAuth, user }
) => {
  if (isAuth) {
    const currentAccount = await Account.findOne({ user_id: user.id });

    if (currentAccount) {
      // find task to update
      const taskToUpdate = currentAccount.tasks.find((task: TagInterface) => {
        return task.id === taskId;
      });

      if (!taskToUpdate) {
        throw new UserInputError("Task is not exist");
      }

      if (content) {
        taskToUpdate.content = content;
      }

      if (status) {
        taskToUpdate.status = status;
      }

      if (tags) {
        // remove task id from all tags it belong to
        currentAccount.tags = getTagsWithRemovedTaskId(
          currentAccount.tags,
          taskToUpdate.id
        );

        // update  existing tags with new task ids
        currentAccount.tags = getTagsWithUpdatedTasksIds(
          tags,
          currentAccount.tags,
          taskId
        );

        // add tags to account - only these which are not created yet
        const newTags = getOnlyNewTags(tags, currentAccount.tags);
        currentAccount.tags = getTagsUpdatedWithNewItems(
          newTags,
          currentAccount.tags,
          taskId
        );

        // remov tags when there is no tasks connected
        currentAccount.tags = currentAccount.tags.filter(
          (tag: TagInterface) => tag.tasks.length !== 0
        );

        // update array of tag names in task
        taskToUpdate.tags = getArrOfTagNames(tags);
      }

      // TODO - sometimes it crashes in the backbground - it needs to be change to update() propably
      const result = await currentAccount.save((err: any) => {
        if (err) {
          console.log("errrrorrr in task", err);
          return {
            success: false,
            message: err.errors,
          };
        }
      });

      return {
        ...result,
        code: "200",
        success: true,
        message: "Task succesfully updated",
      };
    }
  }
};
