const { model, Schema } = require("mongoose");

export const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  surname: String,
  password: String,
  email: String,
  createdAt: String,
  avatar: { 
    name: String,
    image: Buffer
  }
});

export const User = model("User", userSchema);
