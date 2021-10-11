import React, { useContext } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { AuthContext } from "../contexts/auth";

interface AuthRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps>;
}

export const AuthRoute = (props: AuthRouteProps) => {
  const { component: Component, ...rest }: RouteProps = props;
  const { user } = useContext(AuthContext);

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
