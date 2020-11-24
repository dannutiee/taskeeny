const { model, Schema } = require("mongoose");

export const taskSchema = new Schema({
  user_id: String,
  content: String,
  status: String,
  createdAt: String,
});

export const Task = model("Task", taskSchema);
