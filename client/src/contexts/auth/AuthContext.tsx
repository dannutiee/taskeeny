import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { authReducer } from "./reducer";
import { AuthActionType, AuthState, Token } from "./interfaces";
import { User } from "../../graphql";

export const initialAuthState: AuthState = {
  user: null,
};

const localStorageToken = localStorage.getItem("jwtToken");

if (localStorageToken) {
  const decodedToken = jwtDecode<Token>(localStorageToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    const initialUserData = {
      ...decodedToken,
      token: localStorageToken,
    };
    initialAuthState.user = initialUserData;
  }
}

const AuthContext = createContext({
  user: {} as User | null,
  login: (userData: User): void => {},
  logout: (): void => {},
});

const AuthContextProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const history = useHistory();

  const login = (userData: User): void => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: AuthActionType.LOGIN,
      user: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    history.push("/login");
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
