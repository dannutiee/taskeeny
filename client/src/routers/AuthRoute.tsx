import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

interface AuthRouteProps extends RouteProps {
  component?: any;
  children?: any;
}

export const AuthRoute = (props: AuthRouteProps) => {
  const { component: Component, ...rest } = props;
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
