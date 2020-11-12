export const getBarHeight = (taskTags: string[]): string => {
  let barsCount = taskTags.length;
  return (100 / barsCount).toString() + "%";
};
