import { Account } from "../../../models";
import { AuthtenticatedUserResolvers } from "../../__generated__/typeDefs";

type ResolvePositions = AuthtenticatedUserResolvers["positions"];

export const resolvePositions: ResolvePositions = async (
  _parent,
  _args,
  { isAuth, user }
) => {
  if (isAuth) {
    try {
      const account = await Account.findOne({ user_id: user.id });
      return account.positions;
    } catch (err) {
      throw new Error(err);
    }
  }
};
