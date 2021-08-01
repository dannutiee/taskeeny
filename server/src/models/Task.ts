const { model, Schema } = require("mongoose");

export const taskSchema = new Schema({
  _id: Schema.Types.ObjectId,
  content: String,
  status: String,
  createdAt: String,
  completedAt: String,
  tags: [String],
});

export const Task = model("Task", taskSchema);
