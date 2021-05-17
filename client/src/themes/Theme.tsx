import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { ThemeContext } from "../contexts/theme";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";
import { GlobalStyle } from "./globalStyle";

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const Theme: React.FC = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export { Theme };
