import { mdColors } from "./colors";

export const getRandomColor = () => {
  return mdColors[Math.floor(Math.random() * mdColors.length)];
};
