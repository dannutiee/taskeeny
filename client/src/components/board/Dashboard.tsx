import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useGetTasksQuery, Task, Position } from "../../graphql";
import { DroppableArea } from "../board";
import { getBoardInitialData } from "./initialData";

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
  const [boardInitialDataState, setInitial] = useState({});

  useEffect(() => {
    setInitial(getBoardInitialData(tasks, positions));
  }, [tasks]);

  useEffect(() => {
    setInitial(getBoardInitialData(tasks, positions));
  }, []);

  const hasDataPrepared = Object.keys(boardInitialDataState).length > 0;

  return (
    <DashboardWrapper>
      {hasDataPrepared && <DroppableArea data={boardInitialDataState} />}
    </DashboardWrapper>
  );
};

export const Dashboard = DashboardContainer;

const DashboardWrapper = styled.div`
  width: calc(100% - 240px);
  display: flex;
  justify-content: space-around;
  font-family: "Open Sans";
  position: relative;
  background: ${(p) => p.theme.dashboard.bg};
`;
