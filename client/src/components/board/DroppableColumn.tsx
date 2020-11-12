import React from "react";
import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";
import SingleTask from "./DraggableTask";
import { TaskData } from "../task/interfaces";

interface DroppableColumn {
  column: string;
  tasks: TaskData[];
}

const DroppableColumn: React.FC<DroppableColumn> = ({ column, tasks }) => {
  return (
    <Droppable droppableId={column}>
      {(provided) => (
        <DroppableColumnWrapper
          className={"droppable-column"}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((item, index) => (
            <SingleTask task={item} key={item.id} index={index} />
          ))}
          {provided.placeholder}
        </DroppableColumnWrapper>
      )}
    </Droppable>
  );
};

export default DroppableColumn;

const DroppableColumnWrapper = styled.div`
  &.droppable-column {
    width: 100%;
    margin: 25px;
  }
`;
