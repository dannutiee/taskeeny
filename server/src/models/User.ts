const { model, Schema } = require("mongoose");

export const userSchema = new Schema({
  username: String,
  name: String,
  surname: String,
  password: String,
  email: String,
  createdAt: String,
});

export const User = model("User", userSchema);
