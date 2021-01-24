import React from "react";
import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";
import { DraggableTask } from "../board";
import { TaskData } from "../task/interfaces";
import { taskStatus } from "../task/utils";
import {
  useAddTaskMutation,
  TagInput,
} from "../../graphql/__generated__/typeDefs";

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
  const displayAddButton = columnName === taskStatus.todo.label;
  const [addTaskMutation] = useAddTaskMutation({});

  const addNewTask = (content: string, tags: TagInput[]): void => {
    addTaskMutation({
      variables: {
        input: {
          content,
          tags,
        },
      },
    });
  };

  //TODO - set real data from user input to the database
  const handleAddTask = () => {
    const testTags = [{ name: "homeoffice", color: "#734567" }];
    addNewTask("test z frontu", testTags);
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
              <AddButton onClick={handleAddTask}>
                <span className="material-icons">add</span>
              </AddButton>
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
