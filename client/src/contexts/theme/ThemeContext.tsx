import React, { useState, createContext } from "react";

export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";

type Theme = string;
type ThemeContext = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    window.localStorage.getItem("theme") || LIGHT_THEME
  );
  const toggleTheme = () => {
    if (theme === LIGHT_THEME) {
      window.localStorage.setItem("theme", DARK_THEME);
      setTheme(DARK_THEME);
    } else {
      window.localStorage.setItem("theme", LIGHT_THEME);
      setTheme(LIGHT_THEME);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
