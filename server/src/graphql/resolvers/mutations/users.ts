import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import { User } from "../../../models";
import { MutationResolvers } from "../../__generated__/typeDefs";
import { SECRET_KEY } from "../../../config";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../../utils/validators";

type ResolveRegisterUser = MutationResolvers["registerUser"];
type ResolveLoginUser = MutationResolvers["login"];

const generateToken = (user: any) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

export const resolveRegisterUser: ResolveRegisterUser = async (
  _parent,
  { input }
) => {
  const { username, email, password, confirmPassword, name, surname } = input;

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    name,
    surname,
    password: hashedPassword,
    email,
    createdAt: new Date().toISOString(),
  });

  // validate user data
  const { errors, valid } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  // Make sure user doesn not already exist
  const user = await User.findOne({ username });
  if (user) {
    throw new UserInputError("Username is taken", {
      errors: {
        username: "This username is taken",
      },
    });
  }

  // hash password and create an auth token
  const result = await newUser.save();
  const token = generateToken(result);

  return {
    ...result._doc,
    id: result.id,
    token,
  };
};

export const resolveLogin: ResolveLoginUser = async (
  _parent,
  { email, password }
) => {
  const { errors, valid } = validateLoginInput(email, password);

  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }
  const user = await User.findOne({ email });

  if (!user) {
    errors.general = "User not found";
    throw new UserInputError("User not found", { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = "Wrong credentials";
    throw new UserInputError("Wrong credentials", { errors });
  }

  const token = generateToken(user);
  return {
    ...user._doc,
    id: user.id,
    token,
  };
};
