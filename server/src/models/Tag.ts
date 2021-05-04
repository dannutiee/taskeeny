const { model, Schema } = require("mongoose");

export const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  color: String,
  isActive: Boolean,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export const Tag = model("Tag", tagSchema);
