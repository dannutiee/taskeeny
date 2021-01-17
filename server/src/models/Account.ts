const { model, Schema } = require("mongoose");

import { taskSchema } from "./Task";
import { tagSchema } from "./Tag";
import { positionSchema } from "./Position";

export const accountSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [taskSchema],
  tags: [tagSchema],
  positions: [positionSchema],
});

export const Account = model("Account", accountSchema);
