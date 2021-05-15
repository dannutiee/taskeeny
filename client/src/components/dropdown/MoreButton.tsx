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
  background: white;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.task.button.color};
`;
