import React from "react";
import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";
import SingleTask from "./DraggableTask";
import { TaskData } from "../task/interfaces";
import { taskStatus } from "../task/utils";

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
  const displayAddButton = columnName === taskStatus.todo.label;
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <DroppableColumnWrapper
          className={"droppable-column"}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <ColumnTitle>
            {columnName}
            {displayAddButton && (
              <AddButton>
                <span className="material-icons">add</span>
              </AddButton>
            )}
          </ColumnTitle>
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
    margin: 25px 30px;
  }
`;

const ColumnTitle = styled.div`
  text-transform: uppercase;
  font-family: ${(p) => p.theme.column.titleFont};
  font-weight: ${(p) => p.theme.column.titleWeight};
  font-size: ${(p) => p.theme.column.titleSize};
`;

const AddButton = styled.span`
  margin-left: 15px;
  width: 35px;
  height: 35px;
  background: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(p) => p.theme.button.color};
  border: 1px solid ${(p) => p.theme.button.color};
  border-radius: ${(p) => p.theme.button.borderRadius};
  box-shadow: ${(p) => p.theme.button.shadow};
`;
