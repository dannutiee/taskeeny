const mongoose = require("mongoose");

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import { User, Account } from "../../../models";
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
      name: user.name,
      surname: user.surname,
      createdAt: user.createdAt,
    },
    SECRET_KEY,
    { expiresIn: "3h" }
  );

export const resolveRegisterUser: ResolveRegisterUser = async (
  _parent,
  { input: { username, email, password, confirmPassword, name, surname } }
) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
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

  // save new user and create an account
  const result = newUser.save((err: any) => {
    if (err) throw new Error(err);

    const newAccount = new Account({
      _id: new mongoose.Types.ObjectId(),
      user_id: newUser._id.toString(),
    });

    newAccount.save((err: any) => {
      if (err) throw new Error(err);
    });
  });

  // hash password and create an auth token
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

  const token = generateToken({
    id: user.id,
    name: user.name,
    surnmae: user.surname,
    email: user.email,
    createdAt: user.createdAt,
  });

  return {
    ...user,
    code: "200",
    success: true,
    message: "Tasks succesfully created",
    user: {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      token: token,
    },
  };
};
