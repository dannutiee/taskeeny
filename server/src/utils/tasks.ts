import { Tag, TagInput } from "../graphql/__generated__/typeDefs";
import { Tag as TagObject } from "../models";

export const getOnlyNewTags = (inputTags: TagInput[], existingTags: Tag[]) => {
  for (let newTag of existingTags) {
    inputTags = inputTags.filter((el: TagInput) => el.name !== newTag.name);
  }
  return inputTags;
};

export const getArrOfTagNames = (tagsInput: TagInput[]) => {
  const stringTags: String[] = [];
  tagsInput.forEach((el: TagInput) => {
    stringTags.push(el.name);
  });
  return [...stringTags];
};

export const getTagsWithUpdatedTasksIds = (
  inputTags: TagInput[],
  currentTags: Tag[],
  newTaskId: string
): Tag[] => {
  for (let i = 0; i < currentTags.length; i++) {
    if (inputTags.find((el) => el.name === currentTags[i].name)) {
      currentTags[i].tasks.push(newTaskId);
    }
  }
  return currentTags;
};

interface NewTag extends TagInput {
  tasks?: string[];
}

export const getTagsUpdatedWithNewItems = (
  newTags: TagInput[],
  currentTags: Tag[],
  taskId: string
) => {
  if (newTags.length > 0) {
    newTags.forEach((newTag: NewTag) => {
      const newTagObject = new TagObject({
        name: newTag.name,
        color: newTag.color,
        isActive: true,
        tasks: [taskId],
      });

      currentTags.push(newTagObject);
    });
  }

  return currentTags;
};

export const getTagsWithRemovedTaskId = (
  currentTags: Tag[],
  updatedTaskId: string
) => {
  for (let tag of currentTags) {
    const taskIdIndex = tag.tasks.indexOf(updatedTaskId);
    if (taskIdIndex !== -1) {
      tag.tasks.splice(taskIdIndex, 1);
    }
  }
  return currentTags;
};
