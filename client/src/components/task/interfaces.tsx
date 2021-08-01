export interface TaskData {
  id: string;
  status: string;
  content: string;
  createdAt: string;
  completedAt: string;
  tags: string[];
}

//TODO  is this TaskData still needed if we have Task from typedefs
