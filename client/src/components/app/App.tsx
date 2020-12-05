import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import SideNavigation from "../nav/SideNavigation";
import Dashboard from "../board/Dashboard";
import { AuthContext, initialAuthState } from "../../contexts/auth";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.user) {
    return <Redirect to="/login" />;
  }

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
