import React from "react";
import styled from "styled-components";
import ImageUploading from "react-images-uploading";
import { useUploadFileMutation } from "../../graphql/__generated__/typeDefs";

interface AvatarProps {
  userId: string;
}

export const Avatar: React.FC<AvatarProps> = ({ userId }) => {
  const [images, setImages] = React.useState([]); // TODO need to set default image
  const [uploadFile] = useUploadFileMutation({});

  const uploadNewImage = (file: any): void => {
    uploadFile({
      variables: {
        file: file,
      },
    });
  };

  const onChange = (imageList: any) => {
    setImages(imageList);

    const fileToUpload = {
      encoding: imageList[0]["data_url"],
    };
    uploadNewImage(fileToUpload);
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageUpdate }) => {
        const isAvatarUploaded = imageList.length !== 0;
        const updateIndex = 0;
        const onAvatarClick = isAvatarUploaded
          ? () => onImageUpdate(updateIndex)
          : onImageUpload;
        const avatarUrl = isAvatarUploaded
          ? imageList[0]["data_url"]
          : `images/avatar_${userId}.jpg`;

        return (
          <UploadWrapper className="upload__image-wrapper">
            <AvatarBorder>
              <AvatarImage
                onClick={onAvatarClick}
                imageUrl={avatarUrl}
              ></AvatarImage>
            </AvatarBorder>
          </UploadWrapper>
        );
      }}
    </ImageUploading>
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
