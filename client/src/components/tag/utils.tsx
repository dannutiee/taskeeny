import { mdColors } from "./colors";

export const getRandomAvailableColor = (colorsAlreadyInUse: string[]) => {
  const colors = mdColors.filter(
    (color) => !colorsAlreadyInUse.includes(color)
  );
  return colors[Math.floor(Math.random() * colors.length)];
};
