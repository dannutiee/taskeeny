import React, { useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";

import { InitialData } from "./interfaces";
import { reorder, move } from "./utils";
import DroppableColumn from "./DroppableColumn";

//MOCK DATA
const items1 = [
  { id: "five", content: "Pick up the passport from the city hall" },
  {
    id: "four",
    content: "Complete a Udemy course about the Node.js technology",
  },
  {
    id: "one",
    content:
      "Create the new component for top nav and adjust it to the new design as well",
  },
];

const items2 = [
  { id: "six", content: "6" },
  { id: "ten", content: "10" },
  { id: "seven", content: "7" },
];

const items3 = [
  { id: "a", content: "a" },
  { id: "b", content: "b" },
  { id: "c", content: "c" },
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
  "column-done": {
    title: "Done",
    items: items3,
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
          <DroppableColumn
            column={column}
            tasks={tasks[column].items}
            key={column}
          />
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
