import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

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
}

export const TextWithColoredHashtagsContainer: React.FC<TextWithColoredHashtagsContainerProps> = ({
  text,
  allTags,
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
}) => {
  const { theme } = useContext(ThemeContext);
  const tagsContext = useContext(TagsContext);

  console.log("allTags", allTags);
  const [textWithColoredHashtags, setTextWithColoredHashtags] = useState<
    (string | JSX.Element)[]
  >();

  useEffect(() => {
    setTextWithColoredHashtags(colorHashtagsInText());
  }, [allTags, text]);

  const defaultWordColor =
    theme === DARK_THEME
      ? darkTheme.modal.textarea.color
      : lightTheme.modal.textarea.color;

  const onClickTag = (e: any) => {
    const clickedName = e.currentTarget.id;
    const tagToUpdate = [...tagsContext.tags].find(
      (el) => el.name === clickedName
    );
    const newColor = "#0d99ff";

    if (tagToUpdate) {
      const newTag = { ...tagToUpdate, color: newColor };
      const newTagsContext = [...tagsContext.tags].filter(
        (tag) => tag.name !== clickedName
      );
      tagsContext.resetTags([...newTagsContext, newTag]);
    }
    //  updateTagColor(clickedName, newColor);
  };

  const replaceWordWithTagComponent = (tagColor: string, tagName: string) => {
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

  const colorHashtagsInText = () =>
    text.split(" ").flatMap((word) => {
      const wordWithoutHashMark = word.slice(1);
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

const TagWrapper = styled.span`
  color: ${(p) => p.color};
  z-index: 100;
  position: relative;
`;
