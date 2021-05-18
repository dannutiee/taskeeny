import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../../contexts/theme";
import { AuthContext } from "../../contexts/auth";
import { CategoriesList } from "../categories";
import { Dropdown } from "../dropdown";

export const SideNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const onLogout = () => {
    authContext.logout();
  };

  const onChangeTheme = () => {
    toggleTheme(theme === "light" ? "dark" : "light");
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
          <Dropdown.Item onClick={onChangeTheme}>Dark&nbsp;Theme</Dropdown.Item>
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
  background-color: #79a7ff;
`;

const SideNavWrapper = styled.div`
  z-index: 1;
  padding: 25px 10px 25px 25px;
  position: fixed;
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${(p) => p.theme.nav.borderColor};
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
  color: ${(p) => p.theme.nav.userName.color};
  font-size: ${(p) => p.theme.nav.userName.size};
  font-family: ${(p) => p.theme.font.header.family};
  font-weight: ${(p) => p.theme.nav.userName.weight};
`;

const Location = styled.span`
  color: ${(p) => p.theme.nav.userName.color};
  font-size: ${(p) => p.theme.font.size.small};
`;
