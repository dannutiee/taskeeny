const { model, Schema } = require("mongoose");

import { taskSchema } from "./Task";
import { tagSchema } from "./Tag";

export const accountSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [taskSchema],
  tags: [tagSchema],
});

export const Account = model("Account", accountSchema);
