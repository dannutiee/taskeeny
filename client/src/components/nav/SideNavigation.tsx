import React, { useContext, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../../contexts/auth";
import { CategoriesList } from "../categories";
import { Dropdown } from "../dropdown";

export const SideNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);

  const onLogout = () => {
    authContext.logout();
  };

  return (
    <SideNavWrapper>
      <UserSection>
        <div>
          <Avatar></Avatar>
          <UserName>Danuta Ludwikowska</UserName>
          <Location>Kraków, Poland</Location>
        </div>
        <Dropdown button>
          <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </UserSection>

      <CategoriesList />
    </SideNavWrapper>
  );
};

export default SideNavigation;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50px;
  margin-bottom: 20px;
  background-color: #7ba8fe;
`;

const SideNavWrapper = styled.div`
  z-index: 1;
  padding: 25px;
  position: fixed;
  height: 100vh;
  box-sizing: border-box;
  width: ${(p) => p.theme.nav.width};
  background: ${(p) => p.theme.nav.bg};
  box-shadow: ${(p) => p.theme.nav.shadow};
`;

const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  & > button {
    display: flex;
  }
`;

const UserName = styled.div`
  font-size: ${(p) => p.theme.nav.userName.size};
  font-family: ${(p) => p.theme.font.header.family};
  font-weight: ${(p) => p.theme.nav.userName.weight};
`;

const Location = styled.span`
  font-size: ${(p) => p.theme.font.size.small};
`;
