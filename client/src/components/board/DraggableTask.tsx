import React from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";
import { TaskData } from "../task/interfaces";
import { SingleTask } from "../task/SingleTask";

interface SingleTaskProps {
  task: TaskData;
  index: number;
}

export const DraggableTask: React.FC<SingleTaskProps> = ({ task, index }) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      disableInteractiveElementBlocking={true}
    >
      {(provided) => (
        <DraggableTaskWrapper
          className={"draggable-task"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SingleTask task={task} />
        </DraggableTaskWrapper>
      )}
    </Draggable>
  );
};

const DraggableTaskWrapper = styled.div`
  &.draggable-task {
    margin: 20px 5px;
    border: none;
    border-radius: 10px;
    min-height: 120px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${(p) => p.theme.task.bg};
    box-shadow: ${(p) => p.theme.task.shadow};
    :hover {
      background: ${(p) => p.theme.task.bgHover};
    }
  }
`;
