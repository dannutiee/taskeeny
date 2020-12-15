import React from "react";
import styled from "styled-components";

import { useGetTasksQuery, Task } from "../../graphql";
import DroppableArea from "./DroppableArea";
import { InitialData } from "./interfaces";
import { getTasksFilteredByStatus } from "./utils";
import { taskStatus } from "../task/utils";

interface DashboardComponentProps {
  tasks?: Task[];
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

  return <DashboardComponent tasks={data?.user.tasks} />;
};

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  tasks,
}) => {
  const boardInitialData: InitialData = {
    todo: {
      title: taskStatus.todo.label,
      items: getTasksFilteredByStatus(tasks, taskStatus.todo.value),
    },
    in_progress: {
      title: taskStatus.in_progress.label,
      items: getTasksFilteredByStatus(tasks, taskStatus.in_progress.value),
    },
    done: {
      title: taskStatus.done.label,
      items: getTasksFilteredByStatus(tasks, taskStatus.done.value),
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
