import React from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";
import { TaskData } from "../task/interfaces";
import SingleTask from "../task/SingleTask";

interface SingleTaskProps {
  task: TaskData;
  index: number;
}

const DraggableTask: React.FC<SingleTaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
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

export default DraggableTask;

const DraggableTaskWrapper = styled.div`
  &.draggable-task {
    background: ${(p) => p.theme.task.bg};
    margin: 20px 0;
    border: none;
    border-radius: 10px;
    min-height: 120px;
    box-shadow: 1px 2px 5px 2px rgb(34 36 38 / 6%);
  }
`;
