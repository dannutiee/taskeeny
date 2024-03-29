import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { useGetTasksQuery, Task, Position } from "../../graphql";
import { DroppableArea } from "../board";
import { getBoardInitialData } from "./initialData";
import { TagsContext } from "../../contexts/tags";
import { getActiveTagsNames, filterTasks } from "./utils";

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
  const tagsContext = useContext(TagsContext);
  const [boardInitialDataState, setInitial] = useState({});

  const activeTagsNames = getActiveTagsNames(tagsContext.tags);
  const filteredTasks = filterTasks(tasks, activeTagsNames);

  useEffect(() => {
    setInitial(getBoardInitialData(filteredTasks, positions));
  }, [tasks, tagsContext.tags]);

  useEffect(() => {
    setInitial(getBoardInitialData(filteredTasks, positions));
  }, []);

  const hasDataPrepared = boardInitialDataState !== {};

  return (
    <DashboardWrapper>
      {hasDataPrepared && <DroppableArea data={boardInitialDataState} />}
    </DashboardWrapper>
  );
};

export const Dashboard = DashboardContainer;

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: "Open Sans";
  position: relative;
  height: 100%;
  min-height: 100vh;
  width: calc(100% - ${(p) => p.theme.nav.width});
  left: ${(p) => p.theme.nav.width};
  background: ${(p) => p.theme.dashboard.bg};
`;
