import { User } from "../../../models";
import { AuthtenticatedUserResolvers } from "../../__generated__/typeDefs";

type ResolveAvatar = AuthtenticatedUserResolvers["avatar"];

export const resolveAvatar: ResolveAvatar = async (
    _parent,
    _args,
    { user }
  ) => {
    try {
      const currentUser = await User.findById(user.id);

     

      const  encodedImaage= currentUser.avatar.image.toString("base64");
      console.log('currentUser wow --------> ', encodedImaage);
  
      const avatarData = {
        encoding: encodedImaage,
        name: currentUser.avatar.name
      }

      return avatarData
    } catch (err) {
      throw new Error(err);
    }
  };