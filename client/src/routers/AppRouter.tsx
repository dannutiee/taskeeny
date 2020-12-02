import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "../themes/lightTheme";
import App from "../components/app/App";
import { Login } from "../components/signin";
import { AuthContextProvider } from "../contexts/auth";

const AppBody = styled.div`
  font-family: "Montserrat", sans-serif;
`;

export const history = createBrowserHistory();

const AppRouter = () => (
  <ThemeProvider theme={lightTheme}>
    <AuthContextProvider>
      <Router history={history}>
        <AppBody>
          <Switch>
            <Route path="/" component={App} exact />
            <Route path="/login" component={Login} />
          </Switch>
        </AppBody>
      </Router>
    </AuthContextProvider>
  </ThemeProvider>
);

export default AppRouter;
