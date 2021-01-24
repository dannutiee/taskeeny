import React from "react";
import styled from "styled-components";

import { useGetTasksQuery, Task, Position } from "../../graphql";
import DroppableArea from "./DroppableArea";
import { getTasksInOrder, getTasksFilteredByStatus } from "./utils";
import { taskStatus } from "../task/utils";

interface DashboardComponentProps {
  tasks: Task[];
  positions: Position[];
}

export const DashboardContainer: React.FC = () => {
  const { data, error, loading } = useGetTasksQuery();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return null;
  }

  console.log("data", data?.user.tasks);

  return (
    <DashboardComponent
      tasks={data?.user.tasks || []}
      positions={data?.user.positions || []}
    />
  );
};

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  tasks,
  positions,
}) => {
  const boardInitialData = {
    todo: {
      title: taskStatus.todo.label,
      items: getTasksInOrder(
        getTasksFilteredByStatus(tasks, taskStatus.todo.value),
        taskStatus.todo.value,
        positions
      ),
    },
    in_progress: {
      title: taskStatus.in_progress.label,
      items: getTasksInOrder(
        getTasksFilteredByStatus(tasks, taskStatus.in_progress.value),
        taskStatus.in_progress.value,
        positions
      ),
    },
    completed: {
      title: taskStatus.completed.label,
      items: getTasksInOrder(
        getTasksFilteredByStatus(tasks, taskStatus.completed.value),
        taskStatus.completed.value,
        positions
      ),
    },
  };

  return (
    <DashboardWrapper>
      <DroppableArea data={boardInitialData} />
    </DashboardWrapper>
  );
};

export const Dashboard = DashboardContainer;

const DashboardWrapper = styled.div`
  width: calc(100% - 240px);
  background: ${(p) => p.theme.dashboard.bg};
  display: flex;
  justify-content: space-around;
  font-family: "Open Sans";
`;
