import React, { createContext, useReducer } from "react";

import { tagsReducer } from "./reducer";
import { TagsActionType, Tag } from "./interfaces";
import {
  formatTagsToInputFormat,
  TagsInputFormat,
} from "../../components/task/utils";

export const initialTagsState: any = {
  tags: [],
  existingTagNamesWithColors: [],
};

const TagsContext = createContext({
  tags: {} as Tag[],
  existingTagNamesWithColors: [] as TagsInputFormat[],
  resetTags: (tagsData: Tag[]): void => {},
});

const TagsContextProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer(tagsReducer, initialTagsState);

  const resetTags = (tagsData: Tag[]): void => {
    dispatch({
      type: TagsActionType.RESET_TAGS,
      tags: tagsData,
    });
  };

  const existingTagNamesWithColors = formatTagsToInputFormat(state.tags);

  return (
    <TagsContext.Provider
      value={{ tags: state.tags, resetTags, existingTagNamesWithColors }}
      {...props}
    />
  );
};

export { TagsContext, TagsContextProvider };
