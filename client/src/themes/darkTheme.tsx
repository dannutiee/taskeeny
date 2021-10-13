import { COLORS, SHADOWS } from "./globalStyle";
import { lightTheme } from "./lightTheme";

export const darkTheme = {
  hoverable: {
    onHover: {
      opacity: "1",
    },
    opacity: ".8",
  },
  font: {
    ...lightTheme.font,
    color: COLORS.GREY_LIGHT_1,
  },
  dashboard: {
    ...lightTheme.dashboard,
    bg: COLORS.BLUE_DEEP_DARK,
  },
  nav: {
    ...lightTheme.nav,
    bg: COLORS.BLUE_DEEP_DARK,
    borderColor: COLORS.BLUE_DARK,
    userName: {
      ...lightTheme.nav.userName,
      color: COLORS.BLUE,
    },
  },
  categories: {
    ...lightTheme.categories,
    color: COLORS.BLUE,
    nameColor: COLORS.GREY_COLD,
    disabled: "#747aa4",
    shadowHover: "0px 4px 10px rgb(204 213 230 / 12%)",
  },
  column: {
    ...lightTheme.column,
    background: COLORS.BLUE_DEEP_DARK,
    titleColor: COLORS.BLUE,
  },
  button: {
    ...lightTheme.button,
  },
  modal: {
    ...lightTheme.modal,
    bgColor: COLORS.GREY_TRANSPARENT,
    header: {
      color: COLORS.BLUE,
    },
    secondaryBtn: {
      bg: "transparent",
    },
    textarea: {
      border: COLORS.BLUE_LIGHTER_DARK,
      borderFocus: COLORS.BLUE_LIGHTER_DARK_FOCUS,
      color: COLORS.DIRTY_WHITE,
      placeholder: COLORS.GREY_COLD,
    },
  },
  task: {
    ...lightTheme.task,
    bg: COLORS.BLUE_DARK,
    bgHover: COLORS.BLUE_DARK_HOVER,
    color: COLORS.DIRTY_WHITE,
    shadow: SHADOWS.primaryDark,
    button: {
      ...lightTheme.task.button,
      bg: "transparent",
    },
  },
  dropdown: {
    ...lightTheme.dropdown,
    background: COLORS.BLUE_DARK,
    text: COLORS.DIRTY_WHITE,
    menuItem: {
      ...lightTheme.dropdown.menuItem,
      color: COLORS.DIRTY_WHITE,
      hoverColor: COLORS.BLUE_LIGHTER_DARK,
    },
  },
  formInput: {
    ...lightTheme.formInput,
  },
  formButton: {
    ...lightTheme.formButton,
  },
  auth: {
    ...lightTheme.auth,
  },
};
