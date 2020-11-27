import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { ApolloServerExpressConfig } from "apollo-server-express";

import { SECRET_KEY } from "../config";
import { User } from "../models";

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
  token: string;
}

async function getUser(token: string) {
  const { email } = jwt.verify(token, SECRET_KEY) as User;
  return await User.findOne({ email });
}

type ContextFunction = Extract<ApolloServerExpressConfig["context"], Function>;
export const createContext: ContextFunction = async ({ req }) => {
  let user;
  let isAuth = false;
  // get the user token from the headers
  const authorization = req.headers.authorization;

  if (authorization) {
    console.log("auth ok", authorization);
    const token = authorization.replace("Bearer ", "");

    // try to retrieve a user with the token
    try {
      user = await getUser(token);
      if (user) isAuth = true;
      // add authorization status and the user to the context
      console.log("auth", isAuth, user);
      return { isAuth, user };
    } catch (err) {
      throw new AuthenticationError("Invalid/Expired token");
    }
  } else {
    console.log("auth failed");
    return null;
  }
};
