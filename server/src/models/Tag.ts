const { model, Schema } = require("mongoose");

export const tagSchema = new Schema({
  name: String,
  color: String,
  task_id: String,
  user_id: String,
});

export const Tag = model("Tag", tagSchema);
