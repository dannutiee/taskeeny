const { model, Schema } = require("mongoose");

export const positionSchema = new Schema({
  status: String,
  tasksOrder: [String],
});

export const Position = model("Position", positionSchema);
