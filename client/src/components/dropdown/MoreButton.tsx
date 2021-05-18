import React, { ReactNode } from "react";
import styled from "styled-components";

interface MoreButtonProps {
  children?: ReactNode;
  onClick(): void;
}

export const MoreButton: React.FC<MoreButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <StyledButton onClick={onClick}>
      <span className="material-icons">more_vert</span>
      {children}
    </StyledButton>
  );
};

export const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(p) => p.theme.task.button.bg};
  color: ${(p) => p.theme.task.button.color};
`;
