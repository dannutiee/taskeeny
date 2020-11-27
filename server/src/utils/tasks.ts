import { Tag, TagInput } from "../graphql/__generated__/typeDefs";

export const getFilteredTags = (inputTags: TagInput[], existingTags: Tag[]) => {
  for (let newTag of existingTags) {
    inputTags = inputTags.filter((el: any) => el.name !== newTag.name);
  }
  return inputTags;
};
