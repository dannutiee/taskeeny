import { TaskData } from "../task/interfaces";
import { InitialData, TaskWithPosition } from "./interfaces";
import { Task, Position } from "../../graphql";


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

export const getTasksFilteredByStatus = (tasks: Task[] , status: string) => {
  return tasks.filter((task: Task) => task.status === status);
};

export const getTasksInOrder = (tasks: Task[], column: string, positions: Position[]) => {
  const orderedTasks = JSON.parse(JSON.stringify(tasks));
  orderedTasks.forEach((task: TaskWithPosition) => {
    const columnData = positions.find((position: Position) => position.status === column);
    if (columnData) {
      return (task.position = columnData.tasksOrder.indexOf(task.id));
    }
  });
  orderedTasks.sort((a: TaskWithPosition, b: TaskWithPosition) =>(
    a.position > b.position ? 1 : b.position > a.position ? -1 : 0
  )
  );
  return orderedTasks;
};

  export const getTasksIdsFromColumn = (columnName: string, boardData: InitialData) => {
    return boardData[columnName].items.map((task) => task.id);
  };
