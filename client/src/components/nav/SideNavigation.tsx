import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../../contexts/auth";
import { CategoriesList } from "../categories";

export const SideNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <SideNavWrapper>
      navigation
      <button onClick={() => authContext.logout()}>Logout</button>
      <CategoriesList />
    </SideNavWrapper>
  );
};

export default SideNavigation;

const SideNavWrapper = styled.div`
  width: 240px;
  background: red;
  z-index: 1;
  padding: 25px;
  background: ${(p) => p.theme.nav.bg};
  box-shadow: ${(p) => p.theme.nav.shadow};
`;
