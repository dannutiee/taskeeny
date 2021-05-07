import React, { useContext } from "react";
import styled from "styled-components";

import { getBarHeight, getExistingTagColor } from "./utils";
import { TagsContext } from "../../contexts/tags";

interface TagBorderProps {
  tags: string[];
  isModalMode?: boolean;
}
export const TagBorder: React.FC<TagBorderProps> = ({ tags, isModalMode }) => {
  const tagsContext = useContext(TagsContext);

  return (
    <TagBorderWrapper isModalMode={isModalMode}>
      {tags.map((tag, index) => (
        <TagBorderContent
          key={index}
          color={getExistingTagColor(tagsContext.tags, tag)}
          height={getBarHeight(tags)}
        />
      ))}
    </TagBorderWrapper>
  );
};

interface TagBorderContentProps {
  color: string;
  height: string;
}

interface TagBorderWrapperProps {
  isModalMode?: boolean;
}

const TagBorderContent = styled.div<TagBorderContentProps>`
  border-radius: 10px;
  margin: 3px 0;
  background: ${(p) => p.color};
  height: ${(p) => p.height};
`;

const TagBorderWrapper = styled.div<TagBorderWrapperProps>`
  position: absolute;
  width: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - ${(p) => (p.isModalMode ? "20px" : "14px")});
  top: ${(p) => (p.isModalMode ? "10px" : "7px")};
  left: ${(p) => (p.isModalMode ? "10px" : "7px")};
`;
