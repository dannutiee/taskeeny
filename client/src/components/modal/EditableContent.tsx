import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import { TagsContext } from "../../contexts/tags";
import {
  formatTagsToInputFormat,
  getTagsFromText,
  getNewTags,
  getRecogizedTagsInputFormat,
  Status,
  TagsInputFormat,
} from "../task/utils";
import { getRandomAvailableColor } from "../tag/utils";
import { EditableContentProps } from "./interfaces";
import { Header } from "./Header";
import { TextWithColoredHashtags } from "./TextWithColoredHashtags";

export const EditableContent: React.FC<EditableContentProps> = ({
  hide,
  tags = [],
  content = "",
  status = Status.todo,
  taskId,
  addNewTask,
  updateTask,
  deleteTask,
  createdAt = "",
  completedAt = "",
}) => {
  const history = useHistory();
  const textarea = useRef("") as any;

  const tagsContext = useContext(TagsContext);

  const [currentContent, setCurrentContent] = useState(content);
  const [newStatus, setNewStatus] = useState(status);
  const [newTagsNames, setNewTagsNames] = useState<string[]>([]);
  const [newTagsColors, setNewTagsColors] = useState<string[]>([]);

  const allExistingTags: TagsInputFormat[] = formatTagsToInputFormat(
    tagsContext.tags
  );
  const [
    allTagsIncludingNewRecognized,
    setAllTagsIncludingNewRecognized,
  ] = useState<TagsInputFormat[]>(allExistingTags);

  useEffect(() => {
    if (!!addNewTask) textarea.current.focus();
  }, []);

  const onCickSave = () => {
    const newTaskTags: TagsInputFormat[] = getNewTags(
      getTagsFromText(currentContent, allExistingTags).newTags,
      newTagsColors
    );

    const recognizedTags = getRecogizedTagsInputFormat(
      allExistingTags,
      getTagsFromText(currentContent, allExistingTags).existingTags
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

  const setNewTagsNamesAndColors = (newTagNamesFromText: string[]) => {
    const colorsAlreadyInUse: string[] = [
      ...allExistingTags.map((tag) => tag.color),
      ...newTagsColors,
    ];

    setNewTagsNames((prevState) => {
      const newTagNameAdded = newTagNamesFromText.length > prevState.length;
      const newTagNameRemoved = newTagNamesFromText.length < prevState.length;

      if (newTagNameAdded) {
        setNewTagsColors((prevColors) => [
          ...prevColors,
          getRandomAvailableColor(colorsAlreadyInUse),
        ]);
      } else if (newTagNameRemoved) {
        setNewTagsColors((prevColors) => [...prevColors.slice(0, -1)]);
      }
      return [...newTagNamesFromText];
    });
  };

  const onTextChange = (e: any) => {
    e.persist();
    const inputValue = e.target.value;
    setCurrentContent(inputValue);

    const newTagNamesRecognizedInText: string[] = getTagsFromText(
      inputValue,
      allExistingTags
    ).newTags;

    setNewTagsNamesAndColors(newTagNamesRecognizedInText);

    const newTagsRecognizedInText: TagsInputFormat[] = getNewTags(
      newTagNamesRecognizedInText,
      newTagsColors
    );

    setAllTagsIncludingNewRecognized([
      ...allExistingTags,
      ...newTagsRecognizedInText,
    ]);
  };

  return (
    <Modal hide={hide} onSave={onCickSave} onDelete={onClickDelete}>
      <Header
        status={status}
        setNewStatus={setNewStatus}
        createdAt={createdAt}
        completedAt={completedAt}
      />
      <TagBorder tags={tags} isModalMode={true} />
      <EditContent>
        <EditableArea>
          <TextareaVisibleResult>
            <TextWithColoredHashtags
              text={currentContent}
              allTags={allTagsIncludingNewRecognized}
            />
          </TextareaVisibleResult>
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
  color: ${(p) => p.theme.modal.textarea.color};
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
