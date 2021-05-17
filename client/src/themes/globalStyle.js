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
