//Primary colors
const BLUE_LIGHT_1 = "#f6f7fc";
const BLUE = "#79A7FF";
const WHITE = "#fff";
const GREY = "#888888";
const BLUE_GREY = "rgb(224 224 225 / 34%)";
const BLUE_MILK = "rgb(238 242 252 / 66%)";

export const COLORS = {
  BLUE_LIGHT_1,
  WHITE,
  BLUE,
  GREY,
  BLUE_GREY,
  BLUE_MILK,
};

const SHADOWS = {
  primary: "1px 2px 5px 2px rgb(34 36 38 / 6%)",
  modal: "0 1rem 3rem rgba(0,0,0,.175)",
};

const FONTS = {
  primary: "",
  headers: "Poppins, sans-serif",
};

//Light theme

export const lightTheme = {
  dashboard: {
    bg: COLORS.BLUE_LIGHT_1,
  },
  nav: {
    bg: COLORS.WHITE,
    shadow: SHADOWS.primary,
  },
  categories: {
    titleFont: FONTS.headers,
    titleWeight: 600,
    titleSize: "18px",
  },
  column: {
    titleFont: FONTS.headers,
    titleWeight: 600,
    titleSize: "20px",
  },
  button: {
    borderRadius: "5px",
    color: COLORS.BLUE,
    shadow: SHADOWS.primary,
  },
  modal: {
    shadow: SHADOWS.modal,
    bgColor: COLORS.BLUE_MILK,
  },
  task: {
    bg: COLORS.WHITE,
    shadow: SHADOWS.primary,
    button: {
      color: COLORS.BLUE,
    },
    link: {
      color: COLORS.GREY,
      hover: COLORS.BLUE,
    },
    dropdown: {
      text: COLORS.GREY,
      textHover: COLORS.BLUE,
    },
  },
};
