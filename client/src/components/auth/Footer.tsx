import React from "react";
import styled from "styled-components";

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <div />
      <Rights>Copyright © Danuta Ludwikowska | 2021</Rights>
    </FooterWrapper>
  );
};

const Rights = styled.div`
  font-size: ${(p) => p.theme.font.size.tiny};
  color: ${(p) => p.theme.auth.footer.rights.fontColor};
`;

const FooterWrapper = styled.div`
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
