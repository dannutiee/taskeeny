import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { TaskData } from "./interfaces";
import { getBarHeight } from "./utils";

// MOCK DATA

const tags: { [key: string]: string } = {
  home: "#B998F7",
  dana: "#EF31BC",
  learn: "#FFBB6C",
};

// END MOCK DATA

interface SingleTaskProps {
  task: TaskData;
}

const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const onEditClick = () => {
    //TODO   open edit modal
  };

  const onDeleteClick = () => {
    // TODO   delete the task
  };

  const onTagClick = () => {
    // TODO  filter task by choosen tags
  };

  return (
    <Fragment>
      <TagBorderWrapper>
        {task.tags.map((tag, index) => (
          <TagBorder
            key={index}
            color={tags[tag]}
            height={getBarHeight(task.tags)}
          />
        ))}
      </TagBorderWrapper>

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
              <DropdownItem onClick={onEditClick}>Edit</DropdownItem>
              <DropdownItem onClick={onDeleteClick}>Delete</DropdownItem>
            </Dropdown>
          )}
        </MoreButton>
      </TaskFooter>
    </Fragment>
  );
};

export default SingleTask;

const TagBorderWrapper = styled.div`
  position: absolute;
  height: calc(100% - 10px);
  width: 10px;
  left: 5px;
  top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface TagBorderProps {
  color: string;
  height: string;
}

const TagBorder = styled.div<TagBorderProps>`
  border-radius: 10px;
  margin: 3px 0;
  background: ${(p) => p.color};
  height: ${(p) => p.height};
`;

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
