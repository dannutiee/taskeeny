import { Task, Position } from "../../graphql/__generated__/typeDefs";
import { taskStatus } from "../task/utils";
import { getTasksInOrder, getTasksFilteredByStatus } from "./utils";

export const getBoardInitialData = (tasks: Task[], positions: Position[]) => ({
  todo: {
    title: taskStatus.todo.label,
    items: getTasksInOrder(
      getTasksFilteredByStatus(tasks, taskStatus.todo.value),
      taskStatus.todo.value,
      positions
    ),
  },
  in_progress: {
    title: taskStatus.in_progress.label,
    items: getTasksInOrder(
      getTasksFilteredByStatus(tasks, taskStatus.in_progress.value),
      taskStatus.in_progress.value,
      positions
    ),
  },
  completed: {
    title: taskStatus.completed.label,
    items: getTasksInOrder(
      getTasksFilteredByStatus(tasks, taskStatus.completed.value),
      taskStatus.completed.value,
      positions
    ),
  },
});
