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

import { useGetUsersQuery } from "../../graphql";

//MOCK DATA

const items1 = [
  {
    id: "five",
    content: "Pick up the passport from the city hall",
    tags: ["home", "dana", "learn"],
  },
  {
    id: "four",
    content: "Complete a Udemy course about the Node.js technology",
    tags: ["home", "learn"],
  },
  {
    id: "one",
    content:
      "Create the new component for top nav Create the new component for top nav and adjust it to the new design as well Create the new component for top nav and adjust it to the new design as well Create the new component for top nav and adjust it to the new design as well adjust it to the new design as well",
    tags: ["home", "dana", "learn"],
  },
];

const items2 = [
  { id: "six", content: "6", tags: ["home"] },
  { id: "ten", content: "10", tags: ["learn"] },
  { id: "seven", content: "7", tags: ["learn"] },
];

const items3 = [
  { id: "a", content: "a", tags: ["home", "dana"] },
  { id: "b", content: "b", tags: ["home", "dana", "learn"] },
  { id: "c", content: "c", tags: ["learn"] },
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
  const [boardData, setBoardData] = useState<InitialData>(initialData);

  // TODO remove this example of graphql usage
  const { data, error, loading } = useGetUsersQuery();

  console.log("data", data);

  const updateInSingleColumn = (
    source: DraggableLocation,
    destination: DraggableLocation
  ): void => {
    const reorderedItems = reorder(
      boardData[source.droppableId].items,
      source.index,
      destination.index
    );

    setBoardData((prevTasks) => ({
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
      boardData[source.droppableId].items,
      boardData[destination.droppableId].items,
      source.index,
      destination.index
    );

    setBoardData((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: {
        ...prevTasks[source.droppableId],
        items: updatedColumns.sourceList,
      },
      [destination.droppableId]: {
        ...prevTasks[destination.droppableId],
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

  console.log("items state", boardData);

  return (
    <DashboardWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(boardData).map((column, id) => (
          <DroppableColumn
            columnId={column}
            tasks={boardData[column].items}
            columnName={boardData[column].title}
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
  font-family: "Open Sans";
`;
