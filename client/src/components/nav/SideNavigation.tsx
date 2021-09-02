import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext, DARK_THEME } from "../../contexts/theme";
import { AuthContext } from "../../contexts/auth";
import { CategoriesList } from "../categories";
import { Dropdown } from "../dropdown";
import { Avatar } from "./Avatar";

export const SideNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const onLogout = () => {
    authContext.logout();
  };

  const onChangeTheme = () => {
    toggleTheme();
  };

  const themeType = theme === DARK_THEME ? "Light" : "Dark";

  return (
    <SideNavWrapper>
      <UserSection>
        <div>
          <Avatar userId={authContext.user!.id} />
          <UserName>
            {authContext.user!.name} {authContext.user!.surname}
          </UserName>
        </div>
        <Dropdown button>
          <Dropdown.Item onClick={onChangeTheme}>
            {themeType}&nbsp;Theme
          </Dropdown.Item>
          <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </UserSection>

      <CategoriesList />
      <LogoWrapper>
        {" "}
        <Brand>TasKeeny</Brand>
      </LogoWrapper>
    </SideNavWrapper>
  );
};

export default SideNavigation;

const SideNavWrapper = styled.div`
  z-index: 10;
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

const LogoWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const Brand = styled.div`
  font-size: ${(p) => p.theme.font.size.large};
  color: ${(p) => p.theme.font.emphasisColor};
`;
