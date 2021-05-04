import { TaskData } from "../task/interfaces";
import { InitialData, TaskWithPosition } from "./interfaces";
import { Task, Position, Tag as TagType } from "../../graphql";

type Tag = Omit<TagType, "id">;

export const reorder = (
  list: TaskData[],
  startIndex: number,
  endIndex: number
): TaskData[] => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export const move = (
  sourceList: TaskData[],
  destinationList: TaskData[],
  startIndex: number,
  endIndex: number
): { sourceList: TaskData[]; destinationList: TaskData[] } => {
  const [removed] = sourceList.splice(startIndex, 1);
  destinationList.splice(endIndex, 0, removed);

  return {
    sourceList,
    destinationList,
  };
};

export const getTasksFilteredByStatus = (tasks: Task[], status: string) => {
  return tasks.filter((task: Task) => task.status === status);
};

export const getTasksInOrder = (
  tasks: Task[],
  column: string,
  positions: Position[]
) => {
  const orderedTasks = JSON.parse(JSON.stringify(tasks));
  orderedTasks.forEach((task: TaskWithPosition) => {
    const columnData = positions.find(
      (position: Position) => position.status === column
    );
    if (columnData) {
      return (task.position = columnData.tasksOrder.indexOf(task.id));
    }
  });
  orderedTasks.sort((a: TaskWithPosition, b: TaskWithPosition) =>
    a.position > b.position ? 1 : b.position > a.position ? -1 : 0
  );
  return orderedTasks;
};

export const getTasksIdsFromColumn = (
  columnName: string,
  boardData: InitialData
) => {
  return boardData[columnName].items.map((task) => task.id);
};

export const getActiveTagsNames = (allTags: Tag[]): string[] => {
  const activeTagsNames: string[] = [];
  const activeTags = allTags.filter((el) => el.isActive !== false);
  for (let activeTag of activeTags) {
    activeTagsNames.push(activeTag.name);
  }
  return activeTagsNames;
};

export const filterTasks = (tasks: Task[], activeTags: string[]): Task[] => {
  return tasks.filter((task) =>
    task.tags.find((tag) => activeTags.includes(tag))
  );
};
