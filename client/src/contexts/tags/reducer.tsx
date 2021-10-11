import { initialTagsState } from "./TagsContext";
import { TagsReducerAction } from "./interfaces";

const reducer = (state = initialTagsState, action: TagsReducerAction) => {
  switch (action.type) {
    case "RESET_TAGS":
      return {
        ...state,
        tags: action.tags,
      };
    default:
      return state;
  }
};

export const tagsReducer = reducer;
