import { model, Schema } from "mongoose";
import { Document } from "mongoose";

export const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  surname: String,
  password: String,
  email: String,
  createdAt: String,
});

type User = {
  id: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  createdAt: string;
};

export const User = model<User & Document>("User", userSchema);
