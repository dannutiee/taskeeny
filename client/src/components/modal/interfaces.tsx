import { TagsInputFormat } from "../task/utils";

export interface EditTaskModalContainerProps {
  hide: () => void;
  tags: string[];
  content: string;
  status: string;
  taskId: string;
  createdAt: string;
  completedAt: string;
}

export interface AddNewTaskModalContainerProps {
  hide: () => void;
}

export interface EditableContentProps {
  hide: () => void;
  addNewTask?: (
    currentContent: string,
    tagsInContentState: TagsInputFormat[],
    newTaskStatus: string
  ) => void;
  updateTask?: (
    taskId: string,
    newTaskStatus: string,
    currentContent: string,
    tagsInContentState: TagsInputFormat[]
  ) => void;
  updateTags: (tagsInContentState: TagsInputFormat[]) => void;
  deleteTask?: (id: string) => void;
  content?: string;
  tags?: string[];
  status?: string;
  taskId?: string;
  createdAt?: string;
  completedAt?: string;
}
