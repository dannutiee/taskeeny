import React, { Children, ReactElement } from "react";
import styled from "styled-components";

import {
  DropdownProps,
  DropdownItemProps,
  DropdownSubComponents,
} from "./interfaces";

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
}) => {
  return <StyledDropdownItem onClick={onClick}>{children}</StyledDropdownItem>;
};

const DropdownComponent: React.FC<DropdownProps> & DropdownSubComponents = ({
  children,
}) => {
  if (!children) {
    return null;
  }

  return (
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
};

DropdownComponent.Item = DropdownItem;

export const Dropdown = DropdownComponent;

const DropdownWrapper = styled.div`
  position: absolute;
  background: white;
  right: 40px;
  top: 8px;
  border-radius: 5px;
  z-index: 1;
  box-shadow: ${(p) => p.theme.task.shadow};
`;

const StyledDropdownItem = styled.div`
  padding: 10px 20px;
  text-align: left;
  font-family: "Open Sans";
  font-size: ${(p) => p.theme.font.size.small};
  color: ${(p) => p.theme.task.dropdown.text};
  &:hover {
    color: ${(p) => p.theme.task.dropdown.textHover};
  }
`;
