import React, { useContext } from "react";
import styled from "styled-components";

import { TagsInputFormat } from "../task/utils";
import { REG_EX_TAG, getTagColor } from "../tag/utils";
import { ThemeContext, DARK_THEME } from "../../contexts/theme";
import { lightTheme, darkTheme } from "../../themes";

interface TextWithColoredHashtagsProps {
  text: string;
  allTags: TagsInputFormat[];
}

export const TextWithColoredHashtags: React.FC<TextWithColoredHashtagsProps> = ({
  text,
  allTags,
}) => {
  const { theme } = useContext(ThemeContext);

  const defaultWordColor =
    theme === DARK_THEME
      ? darkTheme.modal.textarea.color
      : lightTheme.modal.textarea.color;

  const replaceWordWithTagComponent = (tagColor: string, tagName: string) => {
    const onClickTag = (e: any) => {
      console.log("//TODO clicked tag", e.currentTarget.id);
    };
    return (
      <TagWrapper
        color={tagColor}
        id={tagName.slice(1)}
        className="hashtag"
        onClick={onClickTag}
      >
        {tagName}{" "}
      </TagWrapper>
    );
  };

  const textWithColoredHashtags = text.split(" ").flatMap((word) => {
    const newTagColor = getTagColor(word.slice(1), allTags, defaultWordColor);
    return REG_EX_TAG.test(word)
      ? replaceWordWithTagComponent(newTagColor, word)
      : `${word}` + " ";
  });

  return <>{textWithColoredHashtags}</>;
};

const TagWrapper = styled.span`
  color: ${(p) => p.color};
  z-index: 100;
  position: relative;
`;
