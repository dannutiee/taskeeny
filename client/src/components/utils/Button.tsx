import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  basic?: boolean;
  width?: string;
  onClick?: any;
}
export const Button: React.FC<ButtonProps> = ({
  label,
  type,
  basic,
  width,
  onClick,
}) => {
  return (
    <ButtonComponent type={type} basic={basic} width={width} onClick={onClick}>
      {label}
    </ButtonComponent>
  );
};

interface ButtonComponentProps {
  basic?: boolean;
  width?: string;
}

const ButtonComponent = styled.button<ButtonComponentProps>`
  cursor: pointer;
  margin-top: 15px;
  padding: 10px;
  outline: none;
  background: ${(p) =>
    p.basic ? "transparent" : p.theme.formButton.background};
  border: ${(p) => (p.basic ? "1px solid " : "none")};
  border-color: ${(p) => p.basic && p.theme.formInput.borderColor};
  width: ${(p) => (p.width ? p.width : "100%")};
  border-radius: ${(p) => p.theme.formButton.borderRadius};
  color: ${(p) => (p.basic ? "initial" : p.theme.formButton.textColor)};
`;
