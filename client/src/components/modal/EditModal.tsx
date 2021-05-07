import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import { TagsContext } from "../../contexts/tags";
import {
  useUpdateTaskMutation,
  GetTasksDocument,
  GetTagsDocument,
  TagInput,
} from "../../graphql/__generated__/typeDefs";
import {
  getAllTagsInInputFormat,
  getTagsFromText,
  getNewTagsInputFormat,
  colorAllHastagsInText,
  getRecogizedTagsInputFormat,
} from "../task/utils";
import {
  EditContent,
  EditableArea,
  TextareaVisibleResult,
  InvisibleTextArea,
} from "./EditableContent";
import { getRandomColor } from "../tag/utils";

interface ModalProps {
  tags: string[];
  content: string;
  status: string;
  taskId: string;
  hide: () => void;
}

export const EditModal: React.FC<ModalProps> = ({
  hide,
  tags,
  content,
  status,
  taskId,
}) => {
  const tagsContext = useContext(TagsContext);
  const history = useHistory();
  const text = useRef("") as any;
  const [currentContent, setCurrentContent] = useState(content);
  const [newStatus, setNewStatus] = useState(status);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [newTagsColors, setNewTagsColors] = useState<string[]>([
    getRandomColor(),
  ]);

  const allAvailableTags = getAllTagsInInputFormat(tagsContext.tags);
  //  TODO should be randomly generated from some kind of pallette maybe

  useEffect(() => {
    text.current.innerHTML = colorAllHastagsInText(content, allAvailableTags);
  }, []);

  const [
    updateTaskMutation,
    { error, data: updateData, loading: updateLoading },
  ] = useUpdateTaskMutation({
    refetchQueries: [{ query: GetTasksDocument }, { query: GetTagsDocument }],
    // awaitRefetchQueries: true,
  });

  const updateTask = async (
    taskId: string,
    status: string,
    content: string,
    tags: TagInput[]
  ): Promise<void> => {
    await updateTaskMutation({
      variables: {
        input: {
          taskId,
          status,
          content,
          tags,
        },
      },
    });
  };

  // TODO - need to be used as a info messages  e.g popup
  const success = updateData?.updateTask?.success || false;
  const errorMessage = updateData?.updateTask?.message || error?.name || "";

  const onCickSave = () => {
    const newTaskTags = getNewTagsInputFormat(
      getTagsFromText(currentContent, allAvailableTags).newTags,
      newTagsColors
    );

    const recognizedTags = getRecogizedTagsInputFormat(
      allAvailableTags,
      getTagsFromText(currentContent, allAvailableTags).existingTags
    );

    console.log("edit", taskId, newStatus, currentContent, [
      ...newTaskTags,
      ...recognizedTags,
    ]);

    updateTask(taskId, newStatus, currentContent, [
      ...newTaskTags,
      ...recognizedTags,
    ]);
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

    const newTags = getNewTagsInputFormat(
      getTagsFromText(inputValue, allAvailableTags).newTags,
      newTagsColors
    );
    text.current.innerHTML = colorAllHastagsInText(inputValue, [
      ...allAvailableTags,
      ...newTags,
    ]);

    setCurrentContent(inputValue);
  };

  return (
    <Modal
      hide={hide}
      onSave={onCickSave}
      status={status}
      setNewStatus={setNewStatus}
    >
      <TagBorder tags={tags} isModalMode={true} />
      <EditContent>
        <EditableArea>
          <TextareaVisibleResult ref={text} />
          <InvisibleTextArea onChange={onTextChange} defaultValue={content} />
        </EditableArea>
      </EditContent>
    </Modal>
  );
};
