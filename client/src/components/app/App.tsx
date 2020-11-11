import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../contexts/AppContext";
import SideNavigation from "../nav/SideNavigation";
import Dashboard from "../board/Dashboard";

const App: React.FC = () => {
  const value = useContext(AppContext);

  console.log("value", value.user);

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
