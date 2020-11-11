export interface TaskData {
  id: string;
  content: string;
}

export interface ColumnData {
  title: string;
  items: TaskData[];
}

export interface InitialData {
  [key: string]: ColumnData;
}
