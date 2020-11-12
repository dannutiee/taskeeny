//Primary colors
const BLUE_LIGHT_1 = "#f6f7fc";
const BLUE = "#79A7FF";
const WHITE = "#fff";
const GREY = "#888888";

export const COLORS = {
  BLUE_LIGHT_1,
  WHITE,
  BLUE,
  GREY,
};

//Light theme

export const lightTheme = {
  dashboard: {
    bg: COLORS.BLUE_LIGHT_1,
  },
  nav: {
    bg: COLORS.WHITE,
    shadow: "0px 0px 9px 2px rgb(34 36 38 / 6%)",
  },
  column: {
    titleFont: "Poppins, sans-serif",
    titleWeight: 600,
    titleSize: "20px",
  },
  task: {
    bg: COLORS.WHITE,
    button: {
      color: COLORS.BLUE,
    },
    link: {
      color: COLORS.GREY,
      hover: COLORS.BLUE,
    },
  },
};
