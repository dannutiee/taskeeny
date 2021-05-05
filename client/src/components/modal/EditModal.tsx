import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import { TagsContext } from "../../contexts/tags";
import { getTagColor } from "../task/utils";
import {
  useUpdateTaskMutation,
  GetTasksDocument,
} from "../../graphql/__generated__/typeDefs";

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
  const newTextRef = useRef("") as any;

  useEffect(() => {
    newTextRef.current.innerHTML = markAllTagsInText(content);
  }, []);

  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentContent, setCurrentContent] = useState(content);
  const [
    updateTaskMutation,
    { error, data: updateData, loading: updateLoading },
  ] = useUpdateTaskMutation({
    refetchQueries: [{ query: GetTasksDocument }],
    awaitRefetchQueries: true,
  });

  const updateTask = async (
    taskId: string,
    status: string,
    content: string
  ): Promise<void> => {
    await updateTaskMutation({
      variables: {
        input: {
          taskId,
          status,
          content,
        },
      },
    });
  };

  // TODO - need to be used as a info messages  e.g popup
  const success = updateData?.updateTask?.success || false;
  const errorMessage = updateData?.updateTask?.message || error?.name || "";

  const onCickSave = () => {
    //TODO - set real data from currentContent - now the state is not updated and gets value from database
    updateTask(taskId, currentStatus, currentContent);
    history.push(`/`);
    hide();
  };

  //TODO Refactor the markAllTagsInText 

  const markAllTagsInText = (content: string) => {
    tags.forEach((tag) => {
      content = content.replace(
        `#${tag}`,
        `<span class="hashtag" style="color: ${getTagColor(
          tagsContext.tags,
          tag
        )};z-index: 100;position: relative;">#${tag}</span>`
      );
    });
    return content;
  };

  return (
    <Modal
      hide={hide}
      onSave={onCickSave}
      status={status}
      shareCurrentStatus={setCurrentStatus}
    >
      <TagBorder tags={tags} isModalMode={true} />

      <EditContent>
        <span ref={newTextRef} />
      </EditContent>
    </Modal>
  );
};

const EditContent = styled.div`
  padding: 20px;
  font-size: ${(p) => p.theme.font.size.big};
`;

interface TagNameProps {
  color: string;
}
const TagName = styled.span<TagNameProps>`
  cursor: pointer;
  color: ${(p) => p.color};
`;
