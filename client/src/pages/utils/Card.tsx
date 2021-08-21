import React from "react";
import styled from "styled-components";

import { Button } from "../../components/utils";
import { FormType } from "./Form";

interface CardProps {
  message: string;
  type: FormType;
}

export const Card: React.FC<CardProps> = ({ children, message, type }) => {
  const text =
    type === FormType.LOGIN
      ? "-- or if you don't have an account yet --"
      : "-- or if you already have an account --";
  const buttonText =
    type === FormType.LOGIN ? "Create an account" : "Log in to your account";
  return (
    <EntryCard>
      <LogoWrapper>
        <Brand>TasKeeny</Brand>
      </LogoWrapper>
      {message && <span>{message}</span>}
      {children}
      <SmallText>{text}</SmallText>
      <ButtonWrapper>
        <Button type="button" label={buttonText} basic />
      </ButtonWrapper>
    </EntryCard>
  );
};

const EntryCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${(p) => p.theme.auth.card.padding};
  border-radius: ${(p) => p.theme.auth.card.borderRadius};
  background: ${(p) => p.theme.auth.card.bg};
  box-shadow: ${(p) => p.theme.auth.card.shadow};
`;

const LogoWrapper = styled.div`
  margin: 10px 0;
`;

const Brand = styled.div`
  font-size: ${(p) => p.theme.font.size.huge};
  color: ${(p) => p.theme.font.emphasisColor};
`;

const SmallText = styled.div`
  text-align: center;
  font-size: ${(p) => p.theme.font.size.tiny};
`;

const ButtonWrapper = styled.div`
  padding: 0 20px;
  width: -webkit-fill-available;
  margin-bottom: ${(p) => p.theme.auth.card.padding};
`;
