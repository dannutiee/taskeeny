import { TaskData } from "../task/interfaces";

export interface ColumnData {
  title: string;
  items: TaskData[];
}

export interface InitialData {
  [key: string]: ColumnData;
}
