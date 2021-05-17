import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import App from "../components/app/App";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthContextProvider } from "../contexts/auth";
import { AuthRoute } from "./AuthRoute";
import { Theme } from "../themes";
import { ThemeProvider } from "../contexts/theme";

const AppBody = styled.div`
  font-family: "Montserrat", sans-serif;
`;

const AppRouter = () => (
  <Router>
    <AuthContextProvider>
      <ThemeProvider>
        <Theme>
          <AppBody>
            <Switch>
              <AuthRoute path="/login" component={Login} exact />
              <AuthRoute path="/register" component={Register} exact />
              <Route path="/" component={App} />
            </Switch>
          </AppBody>
        </Theme>
      </ThemeProvider>
    </AuthContextProvider>
  </Router>
);

export default AppRouter;
