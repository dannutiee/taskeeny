import { TagsInputFormat } from "../task/utils";
import { mdColors } from "./colors";

export const REG_EX_TAG = /^#\w+$/;

export const getRandomAvailableColor = (colorsAlreadyInUse: string[]) => {
  const colors = mdColors.filter(
    (color) => !colorsAlreadyInUse.includes(color)
  );
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getTagColor = (
  tagName: string,
  allTags: TagsInputFormat[],
  defaultColor: string
) => {
  return allTags.find((tag) => tag.name === tagName)?.color || defaultColor;
};
