import { AuthActionType, AuthState, AuthReducerAction } from "./interfaces";
import { initialAuthState } from "./AuthContext";

const reducer = (
  state = initialAuthState,
  action: AuthReducerAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const authReducer = reducer;
