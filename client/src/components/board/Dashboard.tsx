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
  width: calc(100% - 240px);
  display: flex;
  justify-content: space-around;
  font-family: "Open Sans";
  position: relative;
  background: ${(p) => p.theme.dashboard.bg};
`;
