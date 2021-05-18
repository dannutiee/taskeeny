import { COLORS, FONT_SIZE, SHADOWS, FONTS } from "./globalStyle";

export const darkTheme = {
  font: {
    color: COLORS.GREY_LIGHT_1,
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
    bg: COLORS.GREY_DARK_2,
  },
  nav: {
    bg: COLORS.GREY_DARK_2,
    borderColor: COLORS.GREY_DARK,
    shadow: SHADOWS.primary,
    width: "290px",
    userName: {
      color: COLORS.BLUE,
      size: FONT_SIZE.big,
      weight: 600,
    },
  },
  categories: {
    color: COLORS.BLUE,
    titleFont: FONTS.headers,
    titleWeight: 600,
    titleSize: FONT_SIZE.big,
    disabled: COLORS.DISABLED,
    nameColor: COLORS.GREY_LIGHT,
  },
  column: {
    titleColor: COLORS.BLUE,
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
    bgColor: COLORS.GREY_MILK,
    header: {
      color: COLORS.BLUE,
    },
    secondaryBtn: {
      bg: "transparent",
    },
    textarea: {
      border: COLORS.GREY_DARK,
      borderFocus: COLORS.GREY_MEDIUM,
    },
  },
  task: {
    bg: COLORS.GREY_DARK,
    shadow: SHADOWS.primary,
    button: {
      bg: COLORS.GREY_DARK,
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
