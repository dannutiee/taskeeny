//Primary colors
const BLUE_LIGHT_1 = "#f6f7fc";
const BLUE = "#79A7FF";
const WHITE = "#fff";
const GREY = "#888888";
const BLUE_GREY = "rgb(224 224 225 / 34%)";
const BLUE_MILK = "rgb(238 242 252 / 66%)";
const DISABLED = "#e1e1e1";

export const COLORS = {
  BLUE_LIGHT_1,
  WHITE,
  BLUE,
  GREY,
  BLUE_GREY,
  BLUE_MILK,
  DISABLED,
};

const FONT_SIZE = {
  tiny: "12px",
  small: "14px",
  medium: "16px",
  big: "18px",
  large: "20px",
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
  font: {
    basic: {
      family: "Open Sans",
    },
    header: {
      family: FONTS.headers,
    },
    size: {
      tiny: FONT_SIZE.tiny,
      small: FONT_SIZE.small,
      medium: FONT_SIZE.medium,
      big: FONT_SIZE.big,
      large: FONT_SIZE.large,
    },
  },
  dashboard: {
    bg: COLORS.BLUE_LIGHT_1,
  },
  nav: {
    bg: COLORS.WHITE,
    shadow: SHADOWS.primary,
    userName: {
      size: FONT_SIZE.big,
      weight: 600,
    },
  },
  categories: {
    titleFont: FONTS.headers,
    titleWeight: 600,
    titleSize: FONT_SIZE.big,
    disabled: COLORS.DISABLED,
  },
  column: {
    titleFont: FONTS.headers,
    titleWeight: 600,
    titleSize: FONT_SIZE.large,
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
      color: COLORS.BLUE,
      hover: COLORS.BLUE,
    },
  },
  dropdown: {
    text: COLORS.GREY,
    textHover: COLORS.BLUE,
    borderRadius: "5px",
    background: COLORS.WHITE,
    menuItem: {
      height: "30px",
    },
  },
};
