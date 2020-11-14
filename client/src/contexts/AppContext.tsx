import React, { createContext } from "react";

const initialState = {
  user: {
    name: "",
  },
};

export interface User {
  name: string;
}

export interface AppProps {
  user: User;
}

export const AppContext = createContext<AppProps>(initialState);

const myValue = {
  user: {
    name: "danuta",
  },
};

const AppContextProvider: React.FC = (props): JSX.Element => {
  return (
    <AppContext.Provider value={myValue}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
