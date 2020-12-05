import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "../themes/lightTheme";
import App from "../components/app/App";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthContextProvider } from "../contexts/auth";
import { AuthRoute } from "./AuthRoute";

const AppBody = styled.div`
  font-family: "Montserrat", sans-serif;
`;

const AppRouter = () => (
  <ThemeProvider theme={lightTheme}>
    <Router>
      <AuthContextProvider>
        <AppBody>
          <Switch>
            <Route path="/" component={App} exact />
            <AuthRoute path="/login" component={Login} exact />
            <AuthRoute path="/register" component={Register} exact />
          </Switch>
        </AppBody>
      </AuthContextProvider>
    </Router>
  </ThemeProvider>
);

export default AppRouter;
