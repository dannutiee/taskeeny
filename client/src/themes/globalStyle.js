//import normalize from "normalize.css";
import { createGlobalStyle } from "styled-components";

// TODO  try to use normalize - currently there is loader error

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0px;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    transition: all 0.5s;
  }
`;

//Primary colors
const BLACK = "#000";
const WHITE = "#fff";
const GREY = "#888888";
const GREY_LIGHT_1 = "#e9e9ea";
const GREY_MEDIUM = "#484646";
const BLUE = "#79A7FF";

// LIGHT THEME
const BLUE_MILK = "rgb(238 242 252 / 66%)";
const GREY_LIGHT = "#bdc0c6";
const BLUE_LIGHT_1 = "#f6f7fc";
const DISABLED = "#e1e1e1";

//DARK THEME
const GREY_DARK = "#24272c";
const GREY_TRANSPARENT = "#535865a8";
const BLUE_DEEP_DARK = "#1d1f39";
const BLUE_DARK = "#262b4a";
const BLUE_DARK_HOVER = "rgb(38 43 74 / 80%)";
const BLUE_LIGHTER_DARK = "#31375f";
const BLUE_LIGHTER_DARK_FOCUS = "#424c8e";
const DIRTY_WHITE = "#b5bbde";
const GREY_COLD = "#6f77a2";

export const COLORS = {
  BLACK,
  BLUE,
  BLUE_DARK,
  BLUE_DARK_HOVER,
  BLUE_LIGHTER_DARK,
  BLUE_LIGHTER_DARK_FOCUS,
  BLUE_DEEP_DARK,
  BLUE_LIGHT_1,
  BLUE_MILK,
  DISABLED,
  GREY,
  GREY_LIGHT_1,
  GREY_LIGHT,
  GREY_MEDIUM,
  GREY_COLD,
  GREY_DARK,
  WHITE,
  DIRTY_WHITE,
  GREY_TRANSPARENT,
};

export const FONT_SIZE = {
  tiny: "12px",
  small: "14px",
  medium: "16px",
  big: "18px",
  large: "20px",
  huge: "24px",
};

export const SHADOWS = {
  primary: "1px 2px 5px 2px rgb(34 36 38 / 6%)",
  modal: "0 1rem 3rem rgba(0,0,0,.175)",
  primaryDark: "1px 2px 5px 2px rgb(29 31 57 / 71%)",
  hashtagLight:
    "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
  hashtagDark:
    "-1px -1px 0 #262b4a, 1px -1px 0 #262b4a, -1px 1px 0 #262b4a, 1px 1px 0 #262b4a",
};

export const FONTS = {
  primary: "",
  headers: "Poppins, sans-serif",
};
