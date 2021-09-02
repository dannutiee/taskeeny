import { COLORS, FONT_SIZE, SHADOWS, FONTS } from "./globalStyle";

// Default theme
export const lightTheme = {
  hoverable: {
    onHover: {
      opacity: ".8",
    },
    opacity: "1",
  },
  font: {
    color: COLORS.BLACK,
    placeholderColor: COLORS.GREY_LIGHT,
    emphasisColor: COLORS.BLUE,
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
      huge: FONT_SIZE.huge,
    },
  },
  dashboard: {
    bg: COLORS.BLUE_LIGHT_1,
  },
  nav: {
    bg: COLORS.WHITE,
    borderColor: COLORS.WHITE,
    shadow: SHADOWS.primary,
    width: "290px",
    userName: {
      color: COLORS.BLACK,
      size: FONT_SIZE.big,
      weight: 600,
    },
    avatar: {
      size: "90px",
      borderColor: COLORS.BLUE,
    },
  },
  categories: {
    color: COLORS.BLACK,
    titleFont: FONTS.headers,
    titleWeight: 600,
    titleSize: FONT_SIZE.big,
    disabled: COLORS.DISABLED,
    nameColor: COLORS.GREY_LIGHT,
  },
  column: {
    background: COLORS.BLUE_LIGHT_1,
    titleColor: COLORS.BLACK,
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
    header: {
      color: COLORS.BLACK,
    },
    secondaryBtn: {
      bg: COLORS.WHITE,
    },
    textarea: {
      border: COLORS.WHITE,
      borderFocus: "#f1f4fc",
      color: COLORS.BLACK,
    },
  },
  task: {
    bg: COLORS.WHITE,
    bgHover: COLORS.WHITE,
    shadow: SHADOWS.primary,
    button: {
      bg: COLORS.WHITE,
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
      color: COLORS.BLACK,
      hoverColor: COLORS.BLUE_MILK,
    },
  },
  formInput: {
    borderRadius: "4px",
    borderColor: COLORS.GREY_LIGHT_1,
    label: {
      color: COLORS.GREY_MEDIUM,
    },
  },
  formButton: {
    background: COLORS.BLUE,
    borderRadius: "4px",
    textColor: COLORS.WHITE,
  },
  auth: {
    bg: COLORS.BLUE,
    card: {
      shadow: SHADOWS.modal,
      bg: COLORS.WHITE,
      borderRadius: "4px",
      padding: "20px",
      width: "360px",
    },
    form: {
      padding: "20px",
    },
    input: {
      padding: "10px",
      focusColor: COLORS.BLUE,
      error: COLORS.ERROR,
    },
    bar: {
      padding: "30px",
    },
    footer: {
      borderColor: COLORS.GREY_LIGHT_1,
      rights: {
        fontColor: COLORS.WHITE,
      },
    },
  },
};
