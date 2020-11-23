const { model, Schema } = require("mongoose");

export const taskSchema = new Schema({
  user_id: String,
  content: String,
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

export const Task = model("Task", taskSchema);
