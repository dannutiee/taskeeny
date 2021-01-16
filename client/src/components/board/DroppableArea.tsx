import React, { useState } from "react";
import {
  DragDropContext,
  DropResult,
  DraggableLocation,
  DraggableId,
} from "react-beautiful-dnd";

import { InitialData } from "./interfaces";
import { reorder, move } from "./utils";
import DroppableColumn from "./DroppableColumn";
import { useUpdateTaskMutation } from "../../graphql/__generated__/typeDefs";

interface DroppableAreaProps {
  data: InitialData;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({ data }) => {
  const [boardData, setBoardData] = useState(data);

  const [
    updateTaskMutation,
    { error, data: updateData, loading: updateLoading },
  ] = useUpdateTaskMutation({});

  const updateTaskStatus = async (
    taskId: string,
    status: string
  ): Promise<void> => {
    await updateTaskMutation({
      variables: {
        input: {
          taskId,
          status,
        },
      },
    });
  };

  // TODO - need to be used as a info messages  e.g popup
  const success = updateData?.updateTask?.success || false;
  const errorMessage = updateData?.updateTask?.message || error?.name || "";

  console.log("boardData", boardData);

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
    destination: DraggableLocation,
    draggableId: DraggableId
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

    updateTaskStatus(draggableId, destination.droppableId);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const isTaskChangedColumn = source.droppableId !== destination?.droppableId;

    if (!destination) {
      return;
    }

    if (isTaskChangedColumn) {
      updateBetweenTwoColumns(source, destination, draggableId);
    } else {
      updateInSingleColumn(source, destination);
    }
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default DroppableArea;
