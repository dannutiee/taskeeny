import { Tag as TagType } from "../../graphql/__generated__/typeDefs";
import { getRandomAvailableColor } from "../tag/utils";

type Tag = Omit<TagType, "id">;

export interface TagsInputFormat {
  name: string;
  color: string;
}

export const getBarHeight = (taskTags: string[]): string => {
  let barsCount = taskTags.length;
  return (100 / barsCount).toString() + "%";
};

export enum Status {
  todo = "todo",
  in_progress = "in_progress",
  completed = "completed",
}

export const taskStatus = {
  [Status.todo]: {
    value: Status.todo,
    label: "To do",
  },
  [Status.in_progress]: {
    value: Status.in_progress,
    label: "In Progress",
  },
  [Status.completed]: {
    value: Status.completed,
    label: "Completed",
  },
};

export const getExistingTagColor = (tags: Tag[], tagName: string): string => {
  return tags.find((tag: Tag) => tag.name === tagName)?.color || "";
};

export const isEditModalOpend = (taskId: string, search: string): boolean => {
  return search === `?id=${taskId}`;
};

export const getContentWithoutTagNames = (content: string): string => {
  return content.replace(/#(\w+)/g, "");
};

export const getArrayOfExistingTags = (allAvailableTags: TagsInputFormat[]) => {
  return allAvailableTags.map((tag) => tag.name);
};

interface TagsFromText {
  newTags: string[];
  existingTags: string[];
  allRecognized: string[];
}
export const getTagsFromText = (
  text: string,
  allAvailableTags: TagsInputFormat[]
): TagsFromText => {
  const existingTagsArray = getArrayOfExistingTags(allAvailableTags);
  const newTags: string[] = [];
  const existingTags: string[] = [];
  const allTagNamesInEditableText = text.match(/#(\w+)/g) || [];

  allTagNamesInEditableText.forEach((tagName) => {
    const tagNameIsNew = !existingTagsArray.find((el) => `#${el}` === tagName);
    if (tagNameIsNew) {
      newTags.push(tagName.replace("#", ""));
    } else {
      existingTags.push(tagName.replace("#", ""));
    }
  });

  return {
    newTags,
    existingTags: [...new Set(existingTags)],
    allRecognized: [...newTags, ...new Set(existingTags)],
  };
};

export const getRandomColor = (
  existingTagNamesWithColors: TagsInputFormat[],
  allTagsInCurrentText: TagsInputFormat[]
) => {
  const colorsAlreadyInUse: string[] = [
    ...existingTagNamesWithColors.map((tag) => tag.color),
    ...allTagsInCurrentText.map((tag) => tag.color),
  ];

  return getRandomAvailableColor(colorsAlreadyInUse);
};

export const formatTagsToInputFormat = (
  tagsFromContext: Tag[]
): TagsInputFormat[] => {
  const tags: TagsInputFormat[] = [];

  tagsFromContext.forEach((tag: TagsInputFormat) => {
    tags.push({
      name: tag.name,
      color: tag.color,
    });
  });
  return tags;
};

export const getContentToDisplay = (text: string) => {
  text = text.replace("&60;", "<");
  text = text.replace("&62;", ">");
  text = text.replace("&61;", "=");
  text = text.replace("&42;", "*");
  text = text.replace("&40;", "(");
  text = text.replace("&41;", ")");
  return text;
};

export const getContentToSave = (text: string) => {
  text = text.replace("<", "&60;");
  text = text.replace(">", "&62;");
  text = text.replace("=", "&61;");
  text = text.replace("*", "&42;");
  text = text.replace("(", "&40;");
  text = text.replace(")", "&41;");
  return text;
};

export const getNewTags = (
  newTags: string[],
  newColors: string[]
): TagsInputFormat[] => {
  const tagsArray: TagsInputFormat[] = [];
  newTags.forEach((tagName: string, i = 0) => {
    tagsArray.push({
      name: tagName,
      color: newColors[i],
    });
    i++;
  });
  return tagsArray;
};

export const getRecogizedTagsInputFormat = (
  allAvailableTags: TagsInputFormat[],
  existingTags: string[]
) => {
  const recognizedTags: TagsInputFormat[] = [];
  existingTags.forEach((tagName) => {
    const recoginzed = allAvailableTags.find((tag) => tag.name === tagName);
    if (recoginzed) {
      recognizedTags.push({ name: tagName, color: recoginzed.color });
    }
  });
  return recognizedTags;
};
