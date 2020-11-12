import React from "react";
import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";
import SingleTask from "./DraggableTask";
import { TaskData } from "../task/interfaces";

interface DroppableColumn {
  columnId: string;
  tasks: TaskData[];
  columnName: string;
}

const DroppableColumn: React.FC<DroppableColumn> = ({
  columnId,
  tasks,
  columnName,
}) => {
  console.log("columnname", columnName);
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <DroppableColumnWrapper
          className={"droppable-column"}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <ColumnTitle>{columnName}</ColumnTitle>
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

const ColumnTitle = styled.div`
  text-transform: uppercase;
  font-family: ${(p) => p.theme.column.titleFont};
  font-weight: ${(p) => p.theme.column.titleWeight};
  font-size: ${(p) => p.theme.column.titleSize};
`;
