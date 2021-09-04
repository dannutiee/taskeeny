import React, { useContext } from "react";
import styled from "styled-components";

import { TagsEasyFormatType } from "../task/utils";
import { ThemeContext, DARK_THEME } from "../../contexts/theme";
import { lightTheme, darkTheme } from "../../themes";

interface TextWithColoredHashtagsProps {
  text: string;
  allTags: TagsEasyFormatType[];
}

export const TextWithColoredHashtags: React.FC<TextWithColoredHashtagsProps> = ({
  text,
  allTags,
}) => {
  const { theme } = useContext(ThemeContext);

  const REG_EX_TAG = /^#\w+$/;
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

  const getTagColor = (tagName: string) => {
    return (
      allTags.find((tag) => tag.name === tagName)?.color || defaultWordColor
    );
  };

  const textWithColoredHashtags = text
    .split(" ")
    .flatMap((word) =>
      REG_EX_TAG.test(word)
        ? replaceWordWithTagComponent(getTagColor(word.slice(1)), word)
        : `${word}` + " "
    );

  return <>{textWithColoredHashtags}</>;
};

const TagWrapper = styled.span`
  color: ${(p) => p.color};
  z-index: 100;
  position: relative;
`;
