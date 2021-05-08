export interface EditTaskModalContainerProps {
  hide: () => void;
  tags: string[];
  content: string;
  status: string;
  taskId: string;
}

export interface AddNewTaskModalContainerProps {
  hide: () => void;
}

export interface EditableContentProps {
  hide: () => void;
  addNewTask?: any;
  updateTask?: any;
  content?: string;
  tags?: string[];
  status?: string;
  taskId?: string;
}
