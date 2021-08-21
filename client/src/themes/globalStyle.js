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
const BLUE = "#79A7FF";
const BLUE_GREY = "rgb(224 224 225 / 34%)";
const BLUE_LIGHT_1 = "#f6f7fc";
const BLUE_MILK = "rgb(238 242 252 / 66%)";
const DISABLED = "#e1e1e1";
const GREY = "#888888";
const GREY_LIGHT_1 = "#e9e9ea";
const GREY_LIGHT = "#bdc0c6";
const GREY_MEDIUM = "#484646";
const GREY_DARK = "#24272c";
const GREY_DARK_2 = "#1c1d23";
const WHITE = "#fff";
const GREY_MILK = "#535865a8";

export const COLORS = {
  BLACK,
  BLUE,
  BLUE_GREY,
  BLUE_LIGHT_1,
  BLUE_MILK,
  DISABLED,
  GREY,
  GREY_LIGHT_1,
  GREY_LIGHT,
  GREY_MEDIUM,
  GREY_DARK,
  GREY_DARK_2,
  WHITE,
  GREY_MILK,
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
};

export const FONTS = {
  primary: "",
  headers: "Poppins, sans-serif",
};
