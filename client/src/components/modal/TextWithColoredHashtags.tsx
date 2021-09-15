import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TwitterPicker, ColorResult } from "react-color";

import { TagsInputFormat } from "../task/utils";
import { REG_EX_TAG, getTagColor } from "../tag/utils";
import { ThemeContext, DARK_THEME } from "../../contexts/theme";
import { lightTheme, darkTheme } from "../../themes";
import { TagsContext } from "../../contexts/tags";

interface TextWithColoredHashtagsProps {
  text: string;
  allTags: TagsInputFormat[];
  updateTagColorInState: (name: string, color: string) => void;
}

export const TextWithColoredHashtags: React.FC<TextWithColoredHashtagsProps> = ({
  text,
  allTags,
  updateTagColorInState,
}) => {
  const { theme } = useContext(ThemeContext);
  const tagsContext = useContext(TagsContext);
  const [currentColorPicker, setCurrentColorPicker] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("");

  const [textWithColoredHashtags, setTextWithColoredHashtags] = useState<
    (string | JSX.Element)[]
  >();

  useEffect(() => {
    setTextWithColoredHashtags(colorHashtagsInText());
  }, [allTags, text, currentColorPicker]);

  useEffect(() => {
    const tagAlreadySaved = [...tagsContext.tags].find(
      (el) => el.name === currentColorPicker
    );
    const newContext = [...tagsContext.tags].filter(
      (tag) => tag.name !== currentColorPicker
    );

    if (tagAlreadySaved) {
      const newTag = { ...tagAlreadySaved, color: tagColor };
      tagsContext.resetTags([...newContext, newTag]);
    }
    updateTagColorInState(currentColorPicker, tagColor);
  }, [tagColor]);

  const onClickTag = (name: string) => {
    const newColorPicker = currentColorPicker !== name ? name : "";

    setCurrentColorPicker(newColorPicker);
  };

  const handleColorChange = (color: ColorResult) => {
    setTagColor(color.hex);
  };

  const replaceWordWithTagComponent = (color: string, name: string) => {
    const isColorPickerOpen = name.substring(1) === currentColorPicker;
    return (
      <TagWrapper color={color} className="hashtag">
        <span onClick={() => onClickTag(name.slice(1))}>{name} </span>
        {isColorPickerOpen && (
          <PickerWrapper>
            {" "}
            <TwitterPicker color={tagColor} onChange={handleColorChange} />
          </PickerWrapper>
        )}
      </TagWrapper>
    );
  };

  const colorHashtagsInText = () =>
    text.split(" ").flatMap((word) => {
      const wordWithoutHashMark = word.slice(1);
      const defaultWordColor =
        theme === DARK_THEME
          ? darkTheme.modal.textarea.color
          : lightTheme.modal.textarea.color;

      const newTagColor = getTagColor(
        wordWithoutHashMark,
        allTags,
        defaultWordColor
      );
      return REG_EX_TAG.test(word)
        ? replaceWordWithTagComponent(newTagColor, word)
        : `${word}` + " ";
    });

  return <>{textWithColoredHashtags}</>;
};

const TagWrapper = styled.div`
  color: ${(p) => p.color};
  z-index: 100;
  position: relative;
  display: inline-block;
`;

const PickerWrapper = styled.div`
  position: absolute !important;
`;
