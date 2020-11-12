import React from "react";
import { TaskData } from "./interfaces";

interface SingleTaskProps {
  task: TaskData;
}

const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  return <div>{task.content}</div>;
};

export default SingleTask;
