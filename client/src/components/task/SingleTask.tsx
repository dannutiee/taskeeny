import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import {
  Task,
  useDeleteTaskMutation,
  GetTasksDocument,
  GetTagsDocument,
  useSetActiveTagMutation,
} from "../../graphql/__generated__/typeDefs";
import { useModal } from "../../hooks/useModal";
import { EditTaskModal } from "../modal";
import { TagBorder } from "./TagBorder";
import {
  isEditModalOpend,
  getContentWithoutTagNames,
  getContentToDisplay,
} from "./utils";

import { Dropdown } from "../dropdown";

interface SingleTaskProps {
  task: Task;
}

export const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  const history = useHistory();
  const { toggle, isShowing } = useModal(
    isEditModalOpend(task.id, history.location.search)
  );
  const [deleteTaskMutation] = useDeleteTaskMutation({});
  const [
    setActiveTagMutation,
    { error, data: updateData, loading: updateLoading },
  ] = useSetActiveTagMutation({
    refetchQueries: [{ query: GetTagsDocument }],
  });

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

  const setActiveTag = async (activeTag: string): Promise<void> => {
    await setActiveTagMutation({
      variables: {
        input: {
          activeTag,
        },
      },
    });
  };

  const onDeleteClick = () => {
    deleteTask(task.id);
  };

  const onClickEdit = () => {
    history.push(`/edit?id=${task.id}`);
    toggle();
  };

  const onTagClick = (tagName: string) => {
    setActiveTag(tagName);
    // TODO  filter task by choosen tags
  };

  const onHideModal = () => {
    history.push(`/`);
    toggle();
  };

  console.log("task------->", task);

  return (
    <>
      <TagBorder tags={task.tags} />
      <TaskPreviewContent onClick={onClickEdit}>
        <ClampedText>
          {getContentWithoutTagNames(getContentToDisplay(task.content))}
        </ClampedText>
      </TaskPreviewContent>
      <TaskFooter>
        <TagsWrapper>
          {task.tags.map((tag, index) => (
            <TagLink
              onClick={() => onTagClick(tag)}
              key={index}
            >{`#${tag}`}</TagLink>
          ))}
        </TagsWrapper>

        <Dropdown button>
          <Dropdown.Item onClick={onClickEdit}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={onDeleteClick}>Delete</Dropdown.Item>
        </Dropdown>
      </TaskFooter>
      {isShowing && (
        <EditTaskModal
          hide={onHideModal}
          tags={task.tags}
          content={task.content}
          status={task.status}
          taskId={task.id}
          createdAt={task.createdAt}
          completedAt={task.completedAt || ""}
        />
      )}
    </>
  );
};

const ClampedText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TaskPreviewContent = styled.div`
  margin-left: 10px;
  padding: 20px;
  line-height: 1.5;
`;

const TagsWrapper = styled.div`
  margin-left: 5px;
  padding: 10px;
  padding-left: 20px;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagLink = styled.a`
  text-decoration: none;
  padding: 0px 5px;
  display: inline-block;
  font-size: ${(p) => p.theme.font.size.tiny};
  color: ${(p) => p.theme.categories.nameColor};
  &:hover {
    cursor: pointer;
    color: ${(p) => p.theme.task.link.hover};
  }
`;
