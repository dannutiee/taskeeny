import React, { useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";

import { InitialData } from "./interfaces";
import { reorder, move } from "./utils";

//MOCK DATA
const items1 = [
  { id: "five", content: "5" },
  { id: "four", content: "4" },
  { id: "one", content: "1" },
];

const items2 = [
  { id: "six", content: "6" },
  { id: "ten", content: "10" },
  { id: "seven", content: "7" },
];

const initialData = {
  "column-todo": {
    title: "To do",
    items: items1,
  },
  "column-in-progress": {
    title: "In progress",
    items: items2,
  },
};

// END - MOCK DATA

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<InitialData>(initialData);

  const updateInSingleColumn = (
    source: DraggableLocation,
    destination: DraggableLocation
  ): void => {
    const reorderedItems = reorder(
      tasks[source.droppableId].items,
      source.index,
      destination.index
    );

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: {
        ...prevTasks[source.droppableId],
        items: reorderedItems,
      },
    }));
  };

  const updateBetweenTwoColumns = (
    source: DraggableLocation,
    destination: DraggableLocation
  ): void => {
    const updatedColumns = move(
      tasks[source.droppableId].items,
      tasks[destination.droppableId].items,
      source.index,
      destination.index
    );

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: {
        ...prevTasks[source.droppableId],
        items: updatedColumns.sourceList,
      },
      [destination.droppableId]: {
        ...prevTasks[source.droppableId],
        items: updatedColumns.destinationList,
      },
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const isTaskChangedColumn = source.droppableId !== destination?.droppableId;

    if (!destination) {
      return;
    }

    if (isTaskChangedColumn) {
      updateBetweenTwoColumns(source, destination);
    } else {
      updateInSingleColumn(source, destination);
    }
  };

  console.log("items state", tasks);
  return (
    <DashboardWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(tasks).map((column, id) => (
          <Droppable droppableId={column} key={id}>
            {(provided) => (
              <div
                className={"droppable-column"}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks[column].items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  width: calc(100% - 240px);
  background: ${(p) => p.theme.dashboard.bg};
  display: flex;
  justify-content: space-around;
`;
