import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import SideNavigation from "../nav/SideNavigation";
import { Dashboard } from "../board/Dashboard";
import { AuthContext, initialAuthState } from "../../contexts/auth";
import { TagsContextProvider } from "../../contexts/tags";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.user) {
    return <Redirect to="/login" />;
  }

  console.log("authContext", authContext, "initialAuthState", initialAuthState);

  return (
    <TagsContextProvider>
      <AppWrapper>
        <SideNavigation />
        <Dashboard />
      </AppWrapper>
    </TagsContextProvider>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
`;
