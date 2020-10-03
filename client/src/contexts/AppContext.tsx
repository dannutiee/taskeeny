import React from "react";

const initialState = {};

export const AppContext = React.createContext(initialState);

const myValue = {
  name: "danuta",
};

function AppContextProvider(props: any): JSX.Element {
  return (
    <AppContext.Provider value={myValue}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
