import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../../contexts/auth";

export const SideNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <SideNavWrapper>
      navigation
      <button onClick={() => authContext.logout()}>Logout</button>
    </SideNavWrapper>
  );
};

export default SideNavigation;

const SideNavWrapper = styled.div`
  width: 240px;
  background: red;
  height: 100%;
  background: ${(p) => p.theme.nav.bg};
  box-shadow: ${(p) => p.theme.nav.shadow};
  z-index: 1;
`;
