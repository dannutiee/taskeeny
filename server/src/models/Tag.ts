const { model, Schema } = require("mongoose");

export const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  color: String,
});

export const Tag = model("Tag", tagSchema);
