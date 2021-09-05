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
  { input: { email, password, confirmPassword, name, surname } }
) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    surname,
    password: hashedPassword,
    email,
    createdAt: new Date().toISOString(),
  });

  // validate user data
  const { errors, valid } = validateRegisterInput(
    name,
    surname,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  // Make sure user doesn not already exist
  const user = await User.findOne({ email });
  if (user) {
    errors.general = "This email is taken";
    throw new UserInputError("Account with this email already exist", {
      errors,
    });
  }

  // save new user and create an account
  const result = await newUser.save((err: any) => {
    if (err) throw new Error(err);

    const newAccount = new Account({
      _id: new mongoose.Types.ObjectId(),
      user_id: newUser._id.toString(),
    });

    newAccount.save((err: any) => {
      if (err) throw new Error(err);
    });
  });

  return {
    ...result,
    code: "200",
    success: true,
    message: "Tasks succesfully created",
    user: {
      id: newUser._id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      createdAt: newUser.createdAt,
      token: "",
    },
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
    errors.email = "Account with this e-mail doesn't exist";
    throw new UserInputError("Account with this e-mail doesn't exist", {
      errors,
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = "Wrong credentials";
    throw new UserInputError("Wrong credentials", { errors });
  }

  const token = generateToken({
    id: user.id,
    name: user.name,
    surname: user.surname,
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
