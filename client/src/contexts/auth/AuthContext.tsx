import React, { createContext, useReducer } from "react";

import { authReducer, initialAuthState } from "./reducer";
import { AuthActionType } from "./interfaces";
import { User } from "../../graphql";

const AuthContext = createContext({
  user: {} as User | null,
  login: (userData: User): void => {},
  logout: (): void => {},
});

const AuthContextProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (userData: User): void => {
    dispatch({
      type: AuthActionType.LOGIN,
      user: userData,
    });
  };

  const logout = () => {
    dispatch({ type: AuthActionType.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthContextProvider };
