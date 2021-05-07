import React, { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import {
  useAddTaskMutation,
  TagInput,
  GetTasksDocument,
  GetTagsDocument,
} from "../../graphql/__generated__/typeDefs";
import {
  getAllTagsInInputFormat,
  getTagsFromText,
  getNewTagsInputFormat,
  colorAllHastagsInText,
  getRecogizedTagsInputFormat,
} from "../task/utils";
import { TagsContext } from "../../contexts/tags";
import {
  EditContent,
  EditableArea,
  TextareaVisibleResult,
  InvisibleTextArea,
} from "./EditableContent";
import { getRandomColor } from "../tag/utils";

interface ModalProps {
  hide: () => void;
}

export const AddTaskModal: React.FC<ModalProps> = ({ hide }) => {
  const history = useHistory();
  const text = useRef("") as any;

  const tagsContext = useContext(TagsContext);
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [newTagsColors, setNewTagsColors] = useState<string[]>([
    getRandomColor(),
  ]);

  const allAvailableTags = getAllTagsInInputFormat(tagsContext.tags);

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
    const newTaskTags = getNewTagsInputFormat(
      getTagsFromText(newContent, allAvailableTags).newTags,
      newTagsColors
    );

    const recognizedTags = getRecogizedTagsInputFormat(
      allAvailableTags,
      getTagsFromText(newContent, allAvailableTags).existingTags
    );

    addNewTask(newContent, [...newTaskTags, ...recognizedTags]);
    history.push(`/`);
    hide();
  };

  const setNewTagsAndColors = (text: string) => {
    const newTagsFromText = getTagsFromText(text, allAvailableTags).newTags;

    setNewTags((prevState) => {
      if (newTagsFromText.length > prevState.length) {
        setNewTagsColors((prevColors) => [...prevColors, getRandomColor()]);
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

    setNewContent(inputValue);
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
