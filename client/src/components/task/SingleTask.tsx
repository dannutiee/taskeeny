import React, { Fragment } from "react";
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
            <TagLink href={"#"} key={index}>{`#${tag}`}</TagLink>
          ))}
        </TagsWrapper>
        <MoreButton>
          <span className="material-icons">more_vert</span>
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
  padding: 5px 10px;
  background: white;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.task.button.color};
`;

const TagLink = styled.a`
  text-decoration: none;
  margin-right: 6px;
  font-size: 14px;
  color: ${(p) => p.theme.task.link.color};
  &:hover {
    color: ${(p) => p.theme.task.link.hover};
  }
`;
