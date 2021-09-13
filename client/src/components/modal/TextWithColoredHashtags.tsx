import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TwitterPicker, ColorResult } from "react-color";

import { TagsInputFormat } from "../task/utils";
import { REG_EX_TAG, getTagColor } from "../tag/utils";
import { ThemeContext, DARK_THEME } from "../../contexts/theme";
import { lightTheme, darkTheme } from "../../themes";
import {
  GetTagsDocument,
  useUpdateTagMutation,
} from "../../graphql/__generated__/typeDefs";
import { TagsContext } from "../../contexts/tags";

interface TextWithColoredHashtagsContainerProps {
  text: string;
  allTags: TagsInputFormat[];
  updateNewTagColor: (name: string, color: string) => void; // TODO check what type it will be?
}

export const TextWithColoredHashtagsContainer: React.FC<TextWithColoredHashtagsContainerProps> = ({
  text,
  allTags,
  updateNewTagColor,
}) => {
  const [updateTagMutation, { error, data, loading }] = useUpdateTagMutation({
    refetchQueries: [{ query: GetTagsDocument }],
  });

  const updateTagColor = async (name: string, color: string): Promise<void> => {
    await updateTagMutation({
      variables: {
        input: {
          name,
          color,
        },
      },
    });
  };

  return (
    <TextWithColoredHashtagsComponent
      text={text}
      allTags={allTags}
      updateTagColor={updateTagColor}
      updateNewTagColor={updateNewTagColor}
    />
  );
};

interface TextWithColoredHashtagsComponentProps
  extends TextWithColoredHashtagsContainerProps {
  updateTagColor: (name: string, color: string) => void;
}

const TextWithColoredHashtagsComponent: React.FC<TextWithColoredHashtagsComponentProps> = ({
  text,
  allTags,
  updateTagColor,
  updateNewTagColor,
}) => {
  const { theme } = useContext(ThemeContext);
  const tagsContext = useContext(TagsContext);
  const [currentColorPicker, setCurrentColorPicker] = useState("");
  const [tagColor, setTagColor] = useState("");

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
    const newTagsContext = [...tagsContext.tags].filter(
      (tag) => tag.name !== currentColorPicker
    );

    if (tagAlreadySaved) {
      const newTag = { ...tagAlreadySaved, color: tagColor };
      tagsContext.resetTags([...newTagsContext, newTag]);
    } else {
      updateNewTagColor(currentColorPicker, tagColor);
    }
    //  updateTagColor(clickedName, newColor);  //TODO use this update on save
  }, [tagColor]);

  const onClickTag = (name: string, currentColor: string) => {
    const newColorPicker = currentColorPicker !== name ? name : "";

    setCurrentColorPicker(newColorPicker);
    // setTagColor(currentColor)
  };

  const handleColorChange = (color: ColorResult) => {
    setTagColor(color.hex);
  };

  const replaceWordWithTagComponent = (color: string, name: string) => {
    const isColorPickerOpen = name.substring(1) === currentColorPicker;
    return (
      <TagWrapper
        color={color}
        className="hashtag"
        onBlur={() => console.log("blur")}
      >
        <span onClick={() => onClickTag(name.slice(1), color)}>{name} </span>
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

export const TextWithColoredHashtags = TextWithColoredHashtagsContainer;

const TagWrapper = styled.div`
  color: ${(p) => p.color};
  z-index: 100;
  position: relative;
  display: inline-block;
`;

const PickerWrapper = styled.div`
  position: absolute !important;
`;
