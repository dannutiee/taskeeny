import { COLORS, SHADOWS } from "./globalStyle";
import { lightTheme } from "./lightTheme";

export const darkTheme = {
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
    disabled: COLORS.BLUE_LIGHTER_DARK,
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
    },
  },
  task: {
    ...lightTheme.task,
    bg: COLORS.BLUE_DARK,
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
    text: COLORS.BLUE,
    menuItem: {
      ...lightTheme.dropdown.menuItem,
      color: COLORS.DIRTY_WHITE,
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
