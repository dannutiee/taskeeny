import React from "react";

import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
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
  createdAt,
}) => {
  const [
    updateTaskMutation,
    { error: updateError, data: updateData, loading: updateLoading },
  ] = useUpdateTaskMutation({
    refetchQueries: [{ query: GetTasksDocument }, { query: GetTagsDocument }],
    // awaitRefetchQueries: true,
  });

  const [deleteTaskMutation] = useDeleteTaskMutation({});

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

  const deleteTask = (id: string): void => {
    deleteTaskMutation({
      variables: {
        taskId: id,
      },
      refetchQueries: [
        {
          query: GetTasksDocument,
        },
        {
          query: GetTagsDocument,
        },
      ],
    }).then((resp) => {
      //TODO - add notification
      console.log("delete success", resp.data?.deleteTask?.success);
    });
  };

  // TODO - need to be used as a info messages  e.g popup
  const success = updateData?.updateTask?.success || false;
  const errorMessage =
    updateData?.updateTask?.message || updateError?.name || "";

  return (
    <EditableContent
      hide={hide}
      tags={tags}
      content={content}
      status={status}
      taskId={taskId}
      updateTask={updateTask}
      createdAt={createdAt}
      deleteTask={deleteTask}
    />
  );
};

export const EditTaskModal = EditTaskModalContainer;
