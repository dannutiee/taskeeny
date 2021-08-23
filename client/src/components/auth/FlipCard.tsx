import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Button } from "../utils";
import { Login } from "./Login";
import { Register } from "./Register";

interface CardFaceProps {
  text: string;
  onButtonClick: () => void;
  content: React.ReactNode;
  buttonText: string;
}

export enum AuthType {
  LOGIN = "login",
  REGISTER = "register",
}

const CardFaceComponent: React.FC<CardFaceProps> = ({
  text,
  onButtonClick,
  content,
  buttonText,
}) => {
  return (
    <CardWrapper>
      <Brand>TasKeeny</Brand>
      {content}
      <SmallText>{text}</SmallText>
      <ButtonWrapper>
        <Button
          type="button"
          label={buttonText}
          basic
          onClick={onButtonClick}
        />
      </ButtonWrapper>
    </CardWrapper>
  );
};

export const FlipCard: React.FC = () => {
  const history = useHistory();
  const [authType, setAuthType] = useState(
    history.location.pathname.substring(1)
  );

  const onCardClick = () => {
    const newAuthType =
      authType === AuthType.LOGIN ? AuthType.REGISTER : AuthType.LOGIN;
    setAuthType(newAuthType);
    history.push(newAuthType);
  };

  const isFlipped = authType === AuthType.REGISTER;

  return (
    <Scene>
      <CardContent className={isFlipped ? "is-flipped" : ""}>
        <CardFaceFront>
          <CardFaceComponent
            text={"-- or if you don't have an account yet --"}
            onButtonClick={onCardClick}
            content={<Login />}
            buttonText={"Create an account"}
          />
        </CardFaceFront>
        <CardFaceBack>
          <CardFaceComponent
            text={"-- or if you already have an account --"}
            onButtonClick={onCardClick}
            content={<Register />}
            buttonText={"Log in to your account"}
          />
        </CardFaceBack>
      </CardContent>
    </Scene>
  );
};

const CardFaceFront = styled.div`
  backface-visibility: hidden;
`;

const CardFaceBack = styled.div`
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  &.is-flipped {
    transform: rotateY(180deg);
  }
`;

const Scene = styled.div`
  min-width: 20rem;
  min-height: 360px;
  perspective: 600px;
`;

const CardWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 20rem;
  padding: ${(p) => p.theme.auth.card.padding};
  border-radius: ${(p) => p.theme.auth.card.borderRadius};
  background: ${(p) => p.theme.auth.card.bg};
  box-shadow: ${(p) => p.theme.auth.card.shadow};
  backface-visibility: hidden;
`;

const Brand = styled.div`
  text-align: center;
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
