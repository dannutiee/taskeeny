import React, { useState } from "react";
import styled from "styled-components";
import ImageUploading from "react-images-uploading";

import {useSingleUploadMutation, useGetAvatarQuery} from "../../graphql/__generated__/typeDefs"

export const Avatar: React.FC = () => {
  const [images, setImages] = useState([]);

  const [singleUpload] = useSingleUploadMutation();
  const { data, error, loading } = useGetAvatarQuery();

  console.log('data avatarrrr ', data?.user.avatar)
  console.log('singleUpload', singleUpload)
const url = `data:image/png;base64,${data?.user.avatar?.encoding}`;
  const onChange = async (imageList: any) => {

    const image = imageList[0];
    await singleUpload({ variables: { file: {filename: image.file.name, mimetype: image.file.type, encoding: image.data_url}} }); 
    // data for submit
    console.log('imageList', imageList);
    setImages(imageList);
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageUpdate }) => {
        const isAvatarUploaded = imageList.length !== 0;
        const onAvatarClick = isAvatarUploaded
          ? () => onImageUpdate(0)
          : onImageUpload;
        const urlImg =url.replace('avatar-url: ','')
        return (
          // write your building UI
          <div className="upload__image-wrapper">
            <AvatarComponent
              onClick={onAvatarClick}
              // imageUrl={imageList[0] ? imageList[0]["data_url"] : "/none"}
              imageUrl={imageList[0] ? imageList[0]["data_url"] : `data:image/png;base64,${data?.user.avatar?.encoding}`}
            ></AvatarComponent>
          </div>
        );
      }}
    </ImageUploading>
  );
};

interface AvatarComponentProps {
  imageUrl: string;
}

const AvatarComponent = styled.div<AvatarComponentProps>`
  width: 90px;
  height: 90px;
  border-radius: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #79a7ff;
  background-size: cover;
  background-repeat: no-repeat;
  background-image:  url("${(p) => p.imageUrl}")
`;
