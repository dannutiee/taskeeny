import React from "react";

import {
  useUpdateTaskMutation,
  GetTasksDocument,
  GetTagsDocument,
  TagInput,
} from "../../graphql/__generated__/typeDefs";
import { EditTaskModalContainerProps } from "./interfaces";
import { EditableContent } from "./EditableContent";

const EditTaskModalContainer: React.FC<EditTaskModalContainerProps> = ({
  hide,
  tags,
  content,
  status,
  taskId,
}) => {
  const [
    updateTaskMutation,
    { error, data: updateData, loading: updateLoading },
  ] = useUpdateTaskMutation({
    refetchQueries: [{ query: GetTasksDocument }, { query: GetTagsDocument }],
    // awaitRefetchQueries: true,
  });

  const updateTask = async (
    taskId: string,
    status: string,
    content: string,
    tags: TagInput[]
  ): Promise<void> => {
    await updateTaskMutation({
      variables: {
        input: {
          taskId,
          status,
          content,
          tags,
        },
      },
    });
  };

  // TODO - need to be used as a info messages  e.g popup
  const success = updateData?.updateTask?.success || false;
  const errorMessage = updateData?.updateTask?.message || error?.name || "";

  return (
    <EditableContent
      hide={hide}
      tags={tags}
      content={content}
      status={status}
      taskId={taskId}
      updateTask={updateTask}
    />
  );
};

export const EditTaskModal = EditTaskModalContainer;
