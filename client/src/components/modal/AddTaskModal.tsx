import React, { useContext, useRef, useState } from "react";
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
import { getTagColor } from "../task/utils";
import { TagsContext } from "../../contexts/tags";

interface ModalProps {
  hide: () => void;
}

export const AddTaskModal: React.FC<ModalProps> = ({ hide }) => {
  const history = useHistory();
  const text = useRef("") as any;
  const tagsContext = useContext(TagsContext);
  const [newContent, setNewContent] = useState("");

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
    addNewTask(newContent, testTags);
    history.push(`/`);
    hide();
  };

  //TODO Refactor the markAllTagsInNewText, hashtag and code in this file - components for editable

  const markAllTagsInNewText = (content: string) => {
    tagsContext.tags.forEach((tag) => {
      content = content.replace(
        `<span class="hashtag" style="color: red;z-index: 100;position: relative;">#${tag.name}</span>`,
        `<span class="hashtag" style="color: ${getTagColor(
          tagsContext.tags,
          tag.name
        )};z-index: 100;position: relative;">#${tag.name}</span>`
      );
    });
    return content;
  };

  const hashtag = (text: string) => {
    const repl = text.replace(
      /#(\w+)/g,
      '<span class="hashtag" style="color: red;z-index: 100;position: relative;">#$1</span>'
    );
    return repl;
  };

  const onTextChange = (e: any) => {
    setNewContent(e.target.value);
    text.current.innerHTML = markAllTagsInNewText(hashtag(e.target.value));
  };

  return (
    <Modal hide={hide} onSave={onCickSave} status={"todo"}>
      <TagBorder tags={[]} isModalMode={true} />
      <EditContent>
        <EditableArea>
          <TextareaVisibleResult ref={text} />
          <InvisibleTextArea onChange={onTextChange} />
        </EditableArea>
      </EditContent>
    </Modal>
  );
};

const EditContent = styled.div`
  padding: 20px;
  font-size: ${(p) => p.theme.font.size.big};
`;

const TaskTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: none;
  &:focus-visible {
    outline: none;
  }
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.medium};
`;

const EditableArea = styled.div`
  position: relative;
`;

const TextareaVisibleResult = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  font-family: "Open Sans";
  font-size: 18px;
  color: #0004ff00;
  .hashtag:hover {
    cursor: pointer;
  }
`;
const InvisibleTextArea = styled(TaskTextArea)`
  background: #ffc0cb00;
  position: relative;
  z-index: 10;
  padding: 0;
  font-family: Open Sans;
  font-size: 18px;
`;

interface TagNameProps {
  color: string;
}
