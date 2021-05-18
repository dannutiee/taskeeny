import React, { Children, ReactElement } from "react";
import styled from "styled-components";

import { MoreButton } from "./MoreButton";
import {
  DropdownItemProps,
  DropdownButtonProps,
  MenuProps,
} from "./interfaces";

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
}) => {
  return <StyledDropdownItem onClick={onClick}>{children}</StyledDropdownItem>;
};

const Menu: React.FC<MenuProps> = ({ children }) => (
  <DropdownWrapper>
    {Children.map(children, (child, i) => {
      const item = child as ReactElement<DropdownItemProps>;
      const {
        props: { onClick, title, children },
      } = item;
      return (
        <DropdownItem key={i} onClick={onClick}>
          {title || children}
        </DropdownItem>
      );
    })}
  </DropdownWrapper>
);

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  setMenuVisible,
  menuVisible,
}) => (
  <MoreButton onClick={() => setMenuVisible(!menuVisible)}>
    {menuVisible && <Menu children={children} />}
  </MoreButton>
);

const DropdownWrapper = styled.div`
  position: absolute;
  right: 40px;
  top: 8px;
  z-index: 1;
  background: ${(p) => p.theme.dropdown.background};
  border-radius: ${(p) => p.theme.dropdown.borderRadius};
  box-shadow: ${(p) => p.theme.task.shadow};
`;

const StyledDropdownItem = styled.div`
  padding: 10px 20px;
  text-align: left;
  background: ${(p) => p.theme.task.button.bg};
  font-family: ${(p) => p.theme.font.basic.family};
  font-size: ${(p) => p.theme.font.size.small};
  color: ${(p) => p.theme.dropdown.text};
  &:hover {
    color: ${(p) => p.theme.dropdown.textHover};
  }
`;
