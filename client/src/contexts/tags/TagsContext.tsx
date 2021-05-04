import React, { createContext, useReducer } from "react";

import { tagsReducer } from "./reducer";
import { TagsActionType, Tag } from "./interfaces";

export const initialTagsState: any = {
  tags: [],
};

const TagsContext = createContext({
  tags: {} as Tag[],
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

  return (
    <TagsContext.Provider value={{ tags: state.tags, resetTags }} {...props} />
  );
};

export { TagsContext, TagsContextProvider };
