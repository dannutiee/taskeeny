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
