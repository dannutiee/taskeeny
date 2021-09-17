import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import { TagsContext } from "../../contexts/tags";
import {
  getTagsFromText,
  Status,
  TagsInputFormat,
  getRandomColor,
} from "../task/utils";
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
  updateTags,
}) => {
  const history = useHistory();
  const textarea = useRef("") as any;
  const { existingTagNamesWithColors, tags: tagi } = useContext(TagsContext);

  const [currentContent, setCurrentContent] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState(status);
  const [tagsInContentState, setTagsInContentState] = useState<
    TagsInputFormat[]
  >([]);

  useEffect(() => {
    if (!!addNewTask) textarea.current.focus();
    setCurrentContent(content);
  }, []);

  useEffect(() => {
    const savedTagsInContent = existingTagNamesWithColors.filter((el) =>
      tags.includes(el.name)
    );

    setTagsInContentState((prevState) => {
      if (prevState.length === 0) {
        return savedTagsInContent;
      }
      const newTagsKeept = prevState.filter((el) => !tags.includes(el.name));
      return [...savedTagsInContent, ...newTagsKeept];
    });
  }, [existingTagNamesWithColors]);

  useEffect(() => {
    const tagNamesRecognizedInContent: string[] = getTagsFromText(
      currentContent,
      existingTagNamesWithColors
    ).allRecognized;

    const shouldInitializeNewTag: boolean =
      tagNamesRecognizedInContent.length > tagsInContentState.length;
    const shouldRemoveTag: boolean =
      tagNamesRecognizedInContent.length < tagsInContentState.length;

    resetTagsInContentState(
      shouldInitializeNewTag,
      shouldRemoveTag,
      tagNamesRecognizedInContent
    );
  }, [currentContent]);

  //  ---- Tags in Content State setters  ----

  const initializeNewTagInState = (newName: string) => {
    setTagsInContentState((prevState) => {
      return [
        ...prevState,
        {
          name: newName,
          color: getRandomColor(existingTagNamesWithColors, tagsInContentState),
        },
      ];
    });
  };

  const removeDeletedTagsFromState = (stillExistingTags: TagsInputFormat[]) => {
    setTagsInContentState([...stillExistingTags]);
  };

  const updateChangedTagInState = (
    stillExistingTags: TagsInputFormat[],
    tagToUpdate: TagsInputFormat,
    newName: string
  ) => {
    setTagsInContentState([
      ...stillExistingTags,
      { name: newName, color: getColorForUpdatedTag(tagToUpdate, newName) },
    ]);
  };

  // --  Tags in Content State Main Setter  ----

  const resetTagsInContentState = (
    shouldInitializeNewTag: boolean,
    shouldRemoveTag: boolean,
    tagNamesInContent: string[]
  ) => {
    const tagToUpdate: TagsInputFormat = tagsInContentState.filter(
      (el) => !tagNamesInContent.includes(el.name)
    )[0];

    const newName = tagNamesInContent.filter(
      (el) => !tagsInContentState.map((tag) => tag.name).includes(el)
    )[0];

    const tagsFromStateFilteredByRecognizedInContent: TagsInputFormat[] = tagsInContentState.filter(
      (tag) => tagNamesInContent.includes(tag.name)
    );

    const shouldUpdateTag = Boolean(tagToUpdate) && Boolean(newName);

    if (shouldInitializeNewTag) {
      initializeNewTagInState(newName);
    }

    if (shouldRemoveTag) {
      removeDeletedTagsFromState(tagsFromStateFilteredByRecognizedInContent);
    }

    if (shouldUpdateTag) {
      updateChangedTagInState(
        tagsFromStateFilteredByRecognizedInContent,
        tagToUpdate,
        newName
      );
    }
  };

  // -- helpers ---

  const getColorForUpdatedTag = (
    tagToUpdate: TagsInputFormat,
    newName: string
  ) => {
    const knownTag = existingTagNamesWithColors.find(
      (el) => el.name === newName
    );

    // protect saved tags from overriding theirs colors
    const isKnownTagNameChanged = existingTagNamesWithColors.find(
      (el) => el.color === tagToUpdate.color
    );

    const useNewColor = getRandomColor(
      existingTagNamesWithColors,
      tagsInContentState
    );
    const useCurrentlyEditingTagColor = tagToUpdate.color;
    const newTagNameColor = isKnownTagNameChanged
      ? useNewColor
      : useCurrentlyEditingTagColor;

    return knownTag ? knownTag.color : newTagNameColor;
  };

  // ----- Events  ------

  const onCickSave = async () => {
    if (updateTask) {
      await updateTask(taskId, newTaskStatus, currentContent, [
        ...tagsInContentState,
      ]);
    }
    if (addNewTask) {
      await addNewTask(currentContent, [...tagsInContentState], newTaskStatus);
    }

    updateTags([...tagsInContentState]);

    history.push(`/`);
    hide();
  };

  const onClickDelete = () => {
    deleteTask(taskId);
    history.push(`/`);
    hide();
  };

  const onTextChange = (e: any) => {
    e.persist();
    setCurrentContent(e.target.value);
  };

  const handleTagColorChange = (name: string, color: string) => {
    const tagToUpdate = tagsInContentState.find((tag) => tag.name === name);
    if (tagToUpdate) {
      setTagsInContentState((prev) => {
        const filteredContext = prev.filter((el) => el.name !== name);
        return [...filteredContext, { ...tagToUpdate, color }];
      });
    }
  };

  console.log("state all", tagsInContentState);

  return (
    <Modal hide={hide} onSave={onCickSave} onDelete={onClickDelete}>
      <Header
        status={status}
        setNewStatus={setNewTaskStatus}
        createdAt={createdAt}
        completedAt={completedAt}
      />
      <TagBorder tags={tags} isModalMode={true} />
      <EditContent>
        <EditableArea>
          <TextareaVisibleResult>
            <TextWithColoredHashtags
              text={currentContent}
              allTags={[...tagsInContentState]}
              updateTagColorInState={handleTagColorChange}
            />
          </TextareaVisibleResult>
          <InvisibleTextArea
            onChange={onTextChange}
            defaultValue={content}
            ref={textarea}
            maxLength={410}
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
  overflow: hidden;
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
  padding: 6px;
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
