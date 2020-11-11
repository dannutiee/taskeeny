import React from "react";
import styled from "styled-components";

export const SideNavigation: React.FC = () => {
  return <SideNavWrapper>navigation</SideNavWrapper>;
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
