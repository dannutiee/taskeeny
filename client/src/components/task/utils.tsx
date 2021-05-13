import { Tag as TagType } from "../../graphql/__generated__/typeDefs";

type Tag = Omit<TagType, "id">;
export interface TagsEasyFormatType {
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
  todo: {
    value: Status.todo,
    label: "To do",
  },
  in_progress: {
    value: Status.in_progress,
    label: "In Progress",
  },
  completed: {
    value: Status.completed,
    label: "Completed",
  },
};

export const getExistingTagColor = (tags: any, tagName: string): string => {
  return tags.find((tag: Tag) => tag.name === tagName)?.color || "";
};

export const isEditModalOpend = (taskId: string, search: string): boolean => {
  return search === `?id=${taskId}`;
};

export const getContentWithoutTagNames = (content: string): string => {
  return content.replace(/#(\w+)/g, "");
};

export const getTagHTML = (newTagColor: string, tagName = "$1") => {
  return `<span class="hashtag" style="color: ${newTagColor};z-index: 100;position: relative; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;">#${tagName} </span>`;
};

export const getArrayOfExistingTags = (existingTags: TagsEasyFormatType[]) => {
  const arrayOfExistingTags: string[] = [];
  existingTags.forEach((tag) => {
    arrayOfExistingTags.push(tag.name);
  });
  return arrayOfExistingTags;
};

interface TagsFromText {
  newTags: string[];
  existingTags: string[];
}
export const getTagsFromText = (
  text: string,
  allAvailableTags: TagsEasyFormatType[]
): TagsFromText => {
  const existingTagsArray = getArrayOfExistingTags(allAvailableTags);
  const newTags: string[] = [];
  const existingTags: string[] = [];
  const allTagsInText = text.match(/#(\w+)/g) || [];
  allTagsInText.forEach((tag) => {
    if (!existingTagsArray.find((el) => `#${el}` === tag)) {
      newTags.push(tag.replace("#", ""));
    } else {
      existingTags.push(tag.replace("#", ""));
    }
  });
  return { newTags, existingTags };
};

export const getAllTagsInInputFormat = (
  tagsFromContext: TagsEasyFormatType[]
): TagsEasyFormatType[] => {
  const tagsEasyFormat: TagsEasyFormatType[] = [];
  tagsFromContext.forEach((el: any) => {
    tagsEasyFormat.push({
      name: el.name,
      color: el.color,
    });
  });
  return tagsEasyFormat;
};

export const getNewTagsInputFormat = (
  newTags: string[],
  newColors: string[]
) => {
  const tagsEasyFormat: TagsEasyFormatType[] = [];
  newTags.forEach((el: any, i = 0) => {
    tagsEasyFormat.push({
      name: el,
      color: newColors[i],
    });
    i++;
  });
  return tagsEasyFormat;
};

export const getRecogizedTagsInputFormat = (
  allAvailableTags: TagsEasyFormatType[],
  existingTags: string[]
) => {
  const recognizedTags: TagsEasyFormatType[] = [];
  existingTags.forEach((tagName) => {
    const recoginzed = allAvailableTags.find((tag) => tag.name === tagName);
    if (recoginzed) {
      recognizedTags.push({ name: tagName, color: recoginzed.color });
    }
  });
  return recognizedTags;
};

export const colorAllHastagsInText = (
  text: string,
  existingTags: TagsEasyFormatType[]
) => {
  existingTags.forEach((tag) => {
    text = text.replaceAll(
      `#${tag.name} `,
      `${getTagHTML(tag.color, tag.name)}`
    );
  });
  return text;
};

// TODO  below functions should be deleted probably

// export const colorAllNewHastags = (text: string, color: string, ) => {
//   const repl = text.replace(/#(\w+)/g, `${getTagHTML(color)}`);
//   return repl;
// };

// const getNewTagColor = () => {
//   return "#23df3a"
// }

// export const colorNewHastags = (text: string, color: string) => {
//   const repl = text.replace(/#(\w+)/g, `${getTagHTML(color)}`);
//   return repl;
// };

// export const getTagMutationInput = (text:string, existingTags: TagsEasyFormatType[]) => {
//   const newTags = getNewTagsFromText(text,existingTags);
//   return newTags.map(newTag => {
//     return { name: newTag, color: getNewTagColor() }
//   });

// }

// export const markAllExistingTagsInNewText = (
//   content: string,
//   defaultColor: string,
//   existingTags: TagsEasyFormatType[]
// ) => {
//   existingTags.forEach((tag) => {
//     content = content.replace(
//       `${getTagHTML(defaultColor, tag.name)}`,
//       `${getTagHTML(getExistingTagColor(existingTags, tag.name), tag.name)}`
//     );
//   });
//   console.log('markAllExistingTagsInNewText', content)
//   return content;
// };
