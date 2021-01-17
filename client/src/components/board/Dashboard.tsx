import React from "react";
import styled from "styled-components";

import { useGetTasksQuery, Task, Position } from "../../graphql";
import DroppableArea from "./DroppableArea";
import { InitialData } from "./interfaces";
import { getTasksFilteredByStatus } from "./utils";
import { taskStatus } from "../task/utils";

interface DashboardComponentProps {
  tasks?: Task[];
  positions: any; // TODO fix this
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
      tasks={data?.user.tasks}
      positions={data?.user.positions}
    />
  );
};

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  tasks,
  positions,
}) => {
  //TODO  refactor and move to utils
  const getTasksInOrder = (tasks: any, column: string) => {
    const orderedTasks = JSON.parse(JSON.stringify(tasks));
    orderedTasks.forEach((task: any) => {
      // task.position = positions[0].elements.indexOf(task.id);

      const columnData = positions.find((el: any) => el.status === column);
      //console.log('columnData', columnData, column)
      if (columnData) {
        return (task.position = columnData.tasksOrder.indexOf(task.id));
      }
    });
    orderedTasks.sort((a: any, b: any) =>
      a.position > b.position ? 1 : b.position > a.position ? -1 : 0
    );
    return orderedTasks;
  };

  const boardInitialData: InitialData = {
    todo: {
      title: taskStatus.todo.label,
      items: getTasksInOrder(
        getTasksFilteredByStatus(tasks, taskStatus.todo.value),
        taskStatus.todo.value
      ),
    },
    in_progress: {
      title: taskStatus.in_progress.label,
      items: getTasksInOrder(
        getTasksFilteredByStatus(tasks, taskStatus.in_progress.value),
        taskStatus.in_progress.value
      ),
    },
    completed: {
      title: taskStatus.completed.label,
      items: getTasksInOrder(
        getTasksFilteredByStatus(tasks, taskStatus.completed.value),
        taskStatus.completed.value
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
