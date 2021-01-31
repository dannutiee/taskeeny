import { Tag as TagType } from "../../graphql";

export type Tag = Omit<TagType, "id">;

export enum TagsActionType {
  RESET_TAGS = "RESET_TAGS",
}

export interface TagsState {
  tags: Tag[] | null;
}

export type TagsReducerAction = {
  type: TagsActionType.RESET_TAGS;
  tags: Tag[];
};
