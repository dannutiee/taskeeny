import { TaskData } from "../task/interfaces";
import { Task } from "../../graphql";

export interface ColumnData {
  title: string;
  items: TaskData[];
}

export interface InitialData {
  [key: string]: ColumnData;
}

export interface TaskWithPosition extends Task {
  position: number;
}
