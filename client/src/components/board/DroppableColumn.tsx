import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Droppable } from "react-beautiful-dnd";
import { DraggableTask } from "../board";
import { TaskData } from "../task/interfaces";
import { taskStatus } from "../task/utils";
import { AddNewTaskModal } from "../modal";
import { useModal } from "../../hooks/useModal";

interface DroppableColumn {
  columnId: string;
  tasks: TaskData[];
  columnName: string;
}

export const DroppableColumn: React.FC<DroppableColumn> = ({
  columnId,
  tasks,
  columnName,
}) => {
  const history = useHistory();
  const { toggle, isShowing } = useModal(history.location.pathname === "/new");

  const displayAddButton = columnName === taskStatus.todo.label;

  const handleAddTask = () => {
    history.push(`/new`);
    toggle();
  };

  const onHideModal = () => {
    history.push(`/`);
    toggle();
  };

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
              <>
                <AddButton onClick={handleAddTask}>
                  <span className="material-icons">add</span>
                </AddButton>
                {isShowing && <AddNewTaskModal hide={onHideModal} />}
              </>
            )}
          </ColumnTitle>
          {tasks.map((item, index) => (
            <DraggableTask task={item} key={item.id} index={index} />
          ))}
          {provided.placeholder}
        </DroppableColumnWrapper>
      )}
    </Droppable>
  );
};

const DroppableColumnWrapper = styled.div`
  &.droppable-column {
    width: 100%;
    margin: 25px 30px;
    margin-top: 0px;
  }
`;

const ColumnTitle = styled.div`
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 40px;
  padding-top: 25px;
  border: 5px solid ${(p) => p.theme.column.background};
  background: ${(p) => p.theme.column.background};
  color: ${(p) => p.theme.column.titleColor};
  font-family: ${(p) => p.theme.column.titleFont};
  font-weight: ${(p) => p.theme.column.titleWeight};
  font-size: ${(p) => p.theme.column.titleSize};
`;

const AddButton = styled.span`
  margin-left: 15px;
  width: 35px;
  height: 35px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(p) => p.theme.task.button.bg};
  color: ${(p) => p.theme.button.color};
  border: 1px solid ${(p) => p.theme.button.color};
  border-radius: ${(p) => p.theme.button.borderRadius};
  box-shadow: ${(p) => p.theme.button.shadow};
`;
