import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { ThemeContext, LIGHT_THEME } from "../contexts/theme";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";
import { GlobalStyle } from "./globalStyle";

const Theme: React.FC = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === LIGHT_THEME ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export { Theme };
