import { Account } from "../../../models";
import { MutationResolvers, Position } from "../../__generated__/typeDefs";

type ResolveAddPositions = MutationResolvers["updatePositions"];

export const resolveUpdatePositions: ResolveAddPositions = async (
  _parent,
  { input: { status, tasksOrder } },
  { isAuth, user }
) => {
  if (isAuth) {
    // update  tasks positions
    const currentAccount = await Account.findOne({ user_id: user.id });

    const column = currentAccount.positions.find(
      (el: Position) => el.status === status
    );
    if (column) {
      column.tasksOrder = tasksOrder;
    } else {
      currentAccount.positions.push({
        status,
        tasksOrder,
      });
    }

    const result = await currentAccount.save((err: any) => {
      if (err) {
        return {
          success: false,
          message: err,
        };
      }
    });

    return {
      ...result,
      code: "200",
      success: true,
      message: "Positions succesfully added",
    };
  }
};
