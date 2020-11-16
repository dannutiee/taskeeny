import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Users } from "../../../models";
import { MutationResolvers } from "../../__generated__/typeDefs";
import { SECRET_KEY } from "../../../config";

type ResolveRegisterUser = MutationResolvers["registerUser"];

export const resolveRegisterUser: ResolveRegisterUser = async (
  _parent,
  { input }
) => {
  const { username, email, password, name, surname } = input;

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new Users({
    username,
    name,
    surname,
    password: hashedPassword,
    email,
    createdAt: new Date().toISOString(),
  });

  const result = await newUser.save();
  const token = jwt.sign(
    {
      id: result.id,
      email: result.email,
      username: result.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return {
    ...result._doc,
    id: result.id,
    token,
  };
};
