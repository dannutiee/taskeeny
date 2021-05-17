import React, { useState, createContext } from "react";

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
