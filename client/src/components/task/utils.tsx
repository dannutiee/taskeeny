import { Tag } from "../../graphql/__generated__/typeDefs";

export const getBarHeight = (taskTags: string[]): string => {
  let barsCount = taskTags.length;
  return (100 / barsCount).toString() + "%";
};

export enum Status {
  todo = "todo",
  in_progress = "in_progress",
  completed = "completed",
}

export const taskStatus = {
  todo: {
    value: Status.todo,
    label: "To do",
  },
  in_progress: {
    value: Status.in_progress,
    label: "In Progress",
  },
  completed: {
    value: Status.completed,
    label: "Completed",
  },
};

export const getTagBorderColor = (tags: any, tagName: string): string => {
  return tags.find((tag: Tag) => tag.name === tagName)?.color || "";
};

export const isEditModalOpend = (taskId: string, search: string): boolean => {
  return search === `?id=${taskId}`;
};
