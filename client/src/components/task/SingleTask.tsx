import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import {
  Task,
  useDeleteTaskMutation,
  GetTasksDocument,
  GetTagsDocument,
} from "../../graphql/__generated__/typeDefs";
import { useModal } from "../../hooks/useModal";
import { EditTaskModal } from "../modal";
import { TagBorder } from "./TagBorder";
import { isEditModalOpend, getContentWithoutTagNames } from "./utils";

import { Dropdown, MoreButton } from "../dropdown";

interface SingleTaskProps {
  task: Task;
}

export const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  const history = useHistory();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const { toggle, isShowing } = useModal(
    isEditModalOpend(task.id, history.location.search)
  );
  const [deleteTaskMutation] = useDeleteTaskMutation({});

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

  const onDeleteClick = () => {
    deleteTask(task.id);
  };

  const onClickEdit = () => {
    history.push(`/edit?id=${task.id}`);
    toggle();
  };

  const onTagClick = () => {
    // TODO  filter task by choosen tags
  };

  const onHideModal = () => {
    history.push(`/`);
    toggle();
  };

  // console.log('task before render tasg', task)

  return (
    <>
      <TagBorder tags={task.tags} />
      <TaskContent>{getContentWithoutTagNames(task.content)}</TaskContent>
      <TaskFooter>
        <TagsWrapper>
          {task.tags.map((tag, index) => (
            <TagLink onClick={onTagClick} key={index}>{`#${tag}`}</TagLink>
          ))}
        </TagsWrapper>
        <MoreButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          {dropdownVisible && (
            <Dropdown>
              <Dropdown.Item onClick={onClickEdit}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={onDeleteClick}>Delete</Dropdown.Item>
            </Dropdown>
          )}
        </MoreButton>
      </TaskFooter>
      {isShowing && (
        <EditTaskModal
          hide={onHideModal}
          tags={task.tags}
          content={task.content}
          status={task.status}
          taskId={task.id}
        />
      )}
    </>
  );
};

const TaskContent = styled.div`
  margin-left: 10px;
  padding: 20px;
  line-height: 1.5;
`;

const TagsWrapper = styled.div`
  margin-left: 10px;
  padding: 10px;
  padding-left: 20px;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagLink = styled.a`
  text-decoration: none;
  margin-right: 10px;
  font-size: ${(p) => p.theme.font.size.tiny};
  color: ${(p) => p.theme.task.link.color};
  &:hover {
    cursor: pointer;
    color: ${(p) => p.theme.task.link.hover};
  }
`;
