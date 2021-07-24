import { MutationResolvers } from "../../__generated__/typeDefs";
import { User, Image } from "../../../models";
const mongoose = require("mongoose");

type ResolveSingleUpload = MutationResolvers["singleUpload"];

export const resolveSingleUpload: ResolveSingleUpload = async (
  _parent,
  { file },
  {isAuth, user}
) => {
  if (isAuth) {



    const { filename, mimetype, encoding } = file

   var bindata = Buffer.from(encoding.split(",")[1],"base64");
    // var bindata = Buffer.from(encoding,"base64");

    const currentUser = await User.findOne({ _id: user.id });
    const newAvatar = new Image({
      name: filename,
      image: bindata
    })

    console.log('currentUser ---------->', currentUser)
    console.log('newAvatar ---------->', newAvatar)
    currentUser.avatar = newAvatar;
    // currentUser.avatar.name = newAvatar.name;
    // currentUser.avatar.image = newAvatar.image;

    const result = await currentUser.save((err: any) => {
      if (err) {
        console.log("errrrorrr in User", err);
        return {
          success: false,
          message: err.errors,
        };
      }
    });

    console.log('tuuuuuuuuuuuuuuuuuuuuuuu', bindata, mimetype, filename)
    return { ...result, filename, mimetype, encoding, url: '' } 
  }
};
