import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { AppContext } from "../../contexts/AppContext";
import SideNavigation from "../nav/SideNavigation";
import Dashboard from "../board/Dashboard";
import { AuthContext, initialAuthState } from "../../contexts/auth";

const App: React.FC = () => {
  const value = useContext(AppContext);
  const authContext = useContext(AuthContext);

  if (!authContext.user) {
    return <Redirect to="/login" />;
  }

  console.log("value", value.user);
  console.log("authContext", authContext, "initialAuthState", initialAuthState);

  return (
    <AppWrapper>
      <SideNavigation />
      <Dashboard />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;
