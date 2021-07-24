const { model, Schema } = require("mongoose");

export const imageSchema = new Schema({
  name: String,
  image: Buffer
});

export const Image = model("Image", imageSchema);
