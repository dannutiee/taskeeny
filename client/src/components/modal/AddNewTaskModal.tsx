import React from "react";

import {
  useAddTaskMutation,
  GetTasksDocument,
  GetTagsDocument,
  TagInput,
  useUpdateTagsMutation,
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
  const [
    updateTagsMutation,
    { error: updateTagError },
  ] = useUpdateTagsMutation();

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

  const updateTags = async (tags: TagInput[]): Promise<void> => {
    await updateTagsMutation({
      variables: {
        input: {
          tags,
        },
      },
    });
  };

  return (
    <EditableContent
      hide={hide}
      addNewTask={addNewTask}
      updateTags={updateTags}
    />
  );
};

export const AddNewTaskModal = AddNewTaskModalContainer;
