import React from "react";

import {
  useAddTaskMutation,
  GetTasksDocument,
  GetTagsDocument,
  TagInput,
} from "../../graphql/__generated__/typeDefs";
import { AddNewTaskModalContainerProps } from "./interfaces";
import { EditableContent } from "./EditableContent";

const AddNewTaskModalContainer: React.FC<AddNewTaskModalContainerProps> = ({
  hide,
}) => {
  const [addTaskMutation] = useAddTaskMutation({
    refetchQueries: [{ query: GetTasksDocument }, { query: GetTagsDocument }],
    // awaitRefetchQueries: true,
  });

  const addNewTask = (
    content: string,
    tags: TagInput[],
    status: string
  ): void => {
    addTaskMutation({
      variables: {
        input: {
          content,
          tags,
          status,
        },
      },
    });
  };

  return <EditableContent hide={hide} addNewTask={addNewTask} />;
};

export const AddNewTaskModal = AddNewTaskModalContainer;
