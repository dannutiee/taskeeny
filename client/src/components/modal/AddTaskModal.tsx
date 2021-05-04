import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import {
  useAddTaskMutation,
  TagInput,
  GetTasksDocument,
  GetTagsDocument,
} from "../../graphql/__generated__/typeDefs";

interface ModalProps {
  hide: () => void;
}

export const AddTaskModal: React.FC<ModalProps> = ({ hide }) => {
  const history = useHistory();

  const [addTaskMutation] = useAddTaskMutation({
    refetchQueries: [{ query: GetTasksDocument }, { query: GetTagsDocument }],
    // awaitRefetchQueries: true,
  });

  const addNewTask = (content: string, tags: TagInput[]): void => {
    addTaskMutation({
      variables: {
        input: {
          content,
          tags,
        },
      },
    });
  };

  const onCickSave = () => {
    //TODO - set real data from user input to the database
    const testTags = [{ name: "homeoffice", color: "#734567" }];
    addNewTask("test z frontu", testTags);
    history.push(`/`);
    hide();
  };

  return (
    <Modal hide={hide} onSave={onCickSave} status={"todo"}>
      <TagBorder tags={[]} isModalMode={true} />

      <EditContent>"add here some text"</EditContent>
    </Modal>
  );
};

const EditContent = styled.div`
  padding: 20px;
  font-size: 18px;
`;

interface TagNameProps {
  color: string;
}
