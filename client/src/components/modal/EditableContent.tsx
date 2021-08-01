import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import { TagsContext } from "../../contexts/tags";
import {
  getAllTagsInInputFormat,
  getTagsFromText,
  getNewTagsInputFormat,
  colorAllHastagsInText,
  getRecogizedTagsInputFormat,
} from "../task/utils";
import { getRandomAvailableColor } from "../tag/utils";
import { EditableContentProps } from "./interfaces";
import { Header } from "./Header";

export const EditableContent: React.FC<EditableContentProps> = ({
  hide,
  tags = [],
  content = "",
  status = "todo",
  taskId,
  addNewTask,
  updateTask,
  deleteTask,
  createdAt = "",
}) => {
  const history = useHistory();
  const text = useRef("") as any;
  const textarea = useRef("") as any;

  const tagsContext = useContext(TagsContext);

  const [currentContent, setCurrentContent] = useState(content);
  const [newStatus, setNewStatus] = useState(status);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [newTagsColors, setNewTagsColors] = useState<string[]>([]);

  const allAvailableTags = getAllTagsInInputFormat(tagsContext.tags);
  const colorsAlreadyInUse = [
    ...allAvailableTags.map((value) => value.color),
    ...newTagsColors,
  ];

  useEffect(() => {
    text.current.innerHTML = colorAllHastagsInText(content, allAvailableTags);
    if (!!addNewTask) textarea.current.focus();
  }, []);

  const onCickSave = () => {
    const newTaskTags = getNewTagsInputFormat(
      getTagsFromText(currentContent, allAvailableTags).newTags,
      newTagsColors
    );

    const recognizedTags = getRecogizedTagsInputFormat(
      allAvailableTags,
      getTagsFromText(currentContent, allAvailableTags).existingTags
    );

    if (updateTask) {
      updateTask(taskId, newStatus, currentContent, [
        ...newTaskTags,
        ...recognizedTags,
      ]);
    }
    if (addNewTask) {
      addNewTask(
        currentContent,
        [...newTaskTags, ...recognizedTags],
        newStatus
      );
    }

    history.push(`/`);
    hide();
  };

  const onClickDelete = () => {
    deleteTask(taskId);
    history.push(`/`);
    hide();
  };

  const setNewTagsAndColors = (text: string) => {
    const newTagsFromText = getTagsFromText(text, allAvailableTags).newTags;

    setNewTags((prevState) => {
      if (newTagsFromText.length > prevState.length) {
        setNewTagsColors((prevColors) => [
          ...prevColors,
          getRandomAvailableColor(colorsAlreadyInUse),
        ]);
      } else if (newTagsFromText.length < prevState.length) {
        setNewTagsColors((prevColors) => [...prevColors.slice(0, -1)]);
      }
      return [...newTagsFromText];
    });
  };

  const onTextChange = (e: any) => {
    e.persist();
    const inputValue = e.target.value;

    setNewTagsAndColors(inputValue);

    const newTagsInputFormat = getNewTagsInputFormat(
      getTagsFromText(inputValue, allAvailableTags).newTags,
      newTagsColors
    );
    text.current.innerHTML = colorAllHastagsInText(inputValue, [
      ...allAvailableTags,
      ...newTagsInputFormat,
    ]);

    setCurrentContent(inputValue);
  };

  return (
    <Modal hide={hide} onSave={onCickSave} onDelete={onClickDelete}>
      <Header
        status={status}
        setNewStatus={setNewStatus}
        createdAt={createdAt}
      />
      <TagBorder tags={tags} isModalMode={true} />
      <EditContent>
        <EditableArea>
          <TextareaVisibleResult ref={text} />
          <InvisibleTextArea
            onChange={onTextChange}
            defaultValue={content}
            ref={textarea}
          />
        </EditableArea>
      </EditContent>
    </Modal>
  );
};

export const EditContent = styled.div`
  padding: 20px;
  font-size: ${(p) => p.theme.font.size.big};
`;

export const TaskTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid;
  border-color: ${(p) => p.theme.modal.textarea.border};
  padding: 5px;
  resize: none;
  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.modal.textarea.borderFocus};
  }
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.medium};
`;

export const EditableArea = styled.div`
  position: relative;
`;

export const TextareaVisibleResult = styled.div`
  width: 100%;
  height: 100%;
  padding: 6px;
  position: absolute;
  color: transparent;
  white-space: pre-wrap;
  .hashtag:hover {
    cursor: pointer;
  }
  font-size: ${(p) => p.theme.font.size.big};
  font-family: ${(p) => p.theme.font.basic.family};
`;
export const InvisibleTextArea = styled(TaskTextArea)`
  background: transparent;
  position: relative;
  z-index: 10;
  padding: 5px;
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.big};
`;
