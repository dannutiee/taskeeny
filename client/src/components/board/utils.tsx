import { TaskData } from "../task/interfaces";

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
