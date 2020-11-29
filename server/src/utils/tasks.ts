import { Tag, TagInput } from "../graphql/__generated__/typeDefs";

export const getOnlyNewTags = (inputTags: TagInput[], existingTags: Tag[]) => {
  for (let newTag of existingTags) {
    inputTags = inputTags.filter((el: any) => el.name !== newTag.name);
  }
  return inputTags;
};

export const getArrOfTagNames = (tagsInput: TagInput[]) => {
  const stringTags: String[] = [];
  tagsInput.forEach((el: any) => {
    stringTags.push(el.name);
  });
  return [...stringTags];
};
