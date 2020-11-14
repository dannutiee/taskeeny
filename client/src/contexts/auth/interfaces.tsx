import { User } from "../../graphql";

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface AuthState {
  user: User | null;
}

export type AuthReducerAction =
  | { type: AuthActionType.LOGIN; user: User }
  | { type: AuthActionType.LOGOUT };
