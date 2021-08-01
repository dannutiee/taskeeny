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
          <div className="upload__image-wrapper">
            <AvatarImage
              onClick={onAvatarClick}
              imageUrl={avatarUrl}
            ></AvatarImage>
          </div>
        );
      }}
    </ImageUploading>
  );
};

interface AvatarComponentProps {
  imageUrl: string;
}

const AvatarImage = styled.div<AvatarComponentProps>`
  width: 90px;
  height: 90px;
  border-radius: 50px;
  margin-bottom: 20px;
  background-color: #79a7ff;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("${(p) => p.imageUrl}");
`;
