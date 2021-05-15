import React, { useContext, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../../contexts/auth";
import { CategoriesList } from "../categories";
import { Dropdown, MoreButton } from "../dropdown";

export const SideNavigation: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const onLogout = () => {
    authContext.logout();
  };

  return (
    <SideNavWrapper>
      <UserSection>
        <Avatar></Avatar>
        <MoreButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          {dropdownVisible && (
            <Dropdown>
              <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
            </Dropdown>
          )}
        </MoreButton>
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
  background-color: #7ba8fe;
`;

const SideNavWrapper = styled.div`
  min-width: 240px;
  background: red;
  z-index: 1;
  padding: 25px;
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
