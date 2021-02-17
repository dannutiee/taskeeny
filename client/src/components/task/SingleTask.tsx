import React, { useState } from "react";
import styled from "styled-components";

import {
  Task,
  useDeleteTaskMutation,
  GetTasksDocument,
} from "../../graphql/__generated__/typeDefs";
import { useModal } from "../../hooks/useModal";
import { EditModal } from "../modal";
import { TagBorder } from "./TagBorder";

interface SingleTaskProps {
  task: Task;
}

export const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const { isShowing, toggle } = useModal();

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
      ],
    }).then((resp) => {
      //TODO - add notification
      console.log("delete success", resp.data?.deleteTask?.success);
    });
  };

  const onDeleteClick = () => {
    deleteTask(task.id);
  };

  const onTagClick = () => {
    // TODO  filter task by choosen tags
  };

  return (
    <>
      <TagBorder tags={task.tags} />
      <TaskContent>{task.content}</TaskContent>
      <TaskFooter>
        <TagsWrapper>
          {task.tags.map((tag, index) => (
            <TagLink onClick={onTagClick} key={index}>{`#${tag}`}</TagLink>
          ))}
        </TagsWrapper>
        <MoreButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          <span className="material-icons">more_vert</span>
          {dropdownVisible && (
            <Dropdown>
              <DropdownItem onClick={toggle}>Edit</DropdownItem>
              <DropdownItem onClick={onDeleteClick}>Delete</DropdownItem>
            </Dropdown>
          )}
        </MoreButton>
      </TaskFooter>
      <EditModal
        isShowing={isShowing}
        hide={toggle}
        tags={task.tags}
        content={task.content}
      />
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

const MoreButton = styled.button`
  width: 40px;
  background: white;
  border: none;
  cursor: pointer;
  position: relative;
  color: ${(p) => p.theme.task.button.color};
`;

const TagLink = styled.a`
  text-decoration: none;
  margin-right: 10px;
  font-size: 14px;
  color: ${(p) => p.theme.task.link.color};
  &:hover {
    color: ${(p) => p.theme.task.link.hover};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: white;
  padding: 15px 20px;
  right: 40px;
  top: 8px;
  border-radius: 5px;
  z-index: 1;
  box-shadow: ${(p) => p.theme.task.shadow};
`;

const DropdownItem = styled.div`
  padding: 6px 0;
  text-align: left;
  font-family: "Open Sans";
  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    padding-bottom: 0px;
  }
  &:hover {
    color: ${(p) => p.theme.task.dropdown.textHover};
  }
  color: ${(p) => p.theme.task.dropdown.text};
`;
