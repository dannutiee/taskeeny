import React from "react";
import styled from "styled-components";

import { Footer } from "./Footer";
import { FlipCard } from "./FlipCard";

export const Welcome: React.FC = () => {
  return (
    <MainWrapper>
      <TopBar />
      <FlipCard />
      <Footer />
    </MainWrapper>
  );
};

//TODO verify if  flex is still needed if flipcard is absolute now

const TopBar = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${(p) => p.theme.auth.bar.padding};
`;

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background: ${(p) => p.theme.auth.bg};
`;
