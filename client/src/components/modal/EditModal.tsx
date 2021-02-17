import React, { useContext } from "react";
import styled from "styled-components";

import { Modal } from "./Modal";
import { TagBorder } from "../task/TagBorder";
import { TagsContext } from "../../contexts/tags";
import { getTagBorderColor } from "../task/utils";

interface ModalProps {
  isShowing: boolean;
  tags: string[];
  content: string;
  hide?: () => void;
}

export const EditModal: React.FC<ModalProps> = ({
  isShowing,
  hide,
  tags,
  content,
}) => {
  const tagsContext = useContext(TagsContext);

  return (
    <Modal isShowing={isShowing} hide={hide}>
      <TagBorder tags={tags} isModalMode={true} />

      <EditContent>
        {tags.map((tag, key) => (
          <TagName key={key} color={getTagBorderColor(tagsContext.tags, tag)}>
            {" "}
            {`#${tag}`}{" "}
          </TagName>
        ))}
        {content}
      </EditContent>
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
const TagName = styled.span<TagNameProps>`
  cursor: pointer;
  color: ${(p) => p.color};
`;
