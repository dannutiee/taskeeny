import React, { useContext } from "react";
import styled from "styled-components";
import MD5 from "crypto-js/md5";

import { AuthContext } from "../../contexts/auth";

export const Avatar: React.FC = () => {
  const { user } = useContext(AuthContext);

  const linkToGravatarPage = "https://pl.gravatar.com/";

  const getGravatarEmailHash = () => {
    const email = user?.email.trim().toLocaleLowerCase() || "";
    const hashedEmail = MD5(email);
    return hashedEmail;
  };
  const avatarUrl = `https://www.gravatar.com/avatar/${getGravatarEmailHash()}?d=mp`;

  return (
    <UploadWrapper>
      <AvatarBorder>
        <a href={linkToGravatarPage} target={"_blank"}>
          <AvatarImage imageUrl={avatarUrl}></AvatarImage>
        </a>
      </AvatarBorder>
    </UploadWrapper>
  );
};

interface AvatarComponentProps {
  imageUrl: string;
}

const AvatarImage = styled.div<AvatarComponentProps>`
  width: ${(p) => p.theme.nav.avatar.size};
  height: ${(p) => p.theme.nav.avatar.size};
  border-radius: 50px;
  margin-bottom: 20px;
  background-color: #79a7ff;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("${(p) => p.imageUrl}");
  transform: rotate(190deg);
  cursor: pointer;
`;

const AvatarBorder = styled.div`
  width: ${(p) => p.theme.nav.avatar.size};
  height: ${(p) => p.theme.nav.avatar.size};
  border: 7px solid ${(p) => p.theme.nav.avatar.borderColor};
  border-radius: 50%;
  border-bottom-color: transparent;
  border-right-color: #transparent;
  transform: rotate(170deg);
  position: absolute;
`;

const UploadWrapper = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
`;
