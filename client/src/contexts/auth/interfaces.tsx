import { User } from "../../graphql";

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface AuthState {
  user: User | null;
}

export interface Token {
  id: string;
  name: string;
  surname: string;
  email: string;
  createdAt: string;
  exp: number;
}

export type AuthReducerAction =
  | { type: AuthActionType.LOGIN; user: User }
  | { type: AuthActionType.LOGOUT };
