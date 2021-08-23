import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import App from "../components/app/App";
import { Welcome } from "../components/auth/Welcome";
import { AuthContextProvider } from "../contexts/auth";
import { AuthRoute } from "./AuthRoute";
import { Theme } from "../themes";
import { ThemeProvider } from "../contexts/theme";

const AppBody = styled.div`
  font-family: "Montserrat", sans-serif;
  color: ${(p) => p.theme.font.color};
`;

const AppRouter = () => (
  <Router>
    <AuthContextProvider>
      <ThemeProvider>
        <Theme>
          <AppBody>
            <Switch>
              <AuthRoute path="/login" component={Welcome} exact />
              <AuthRoute path="/register" component={Welcome} exact />
              <Route path="/" component={App} />
            </Switch>
          </AppBody>
        </Theme>
      </ThemeProvider>
    </AuthContextProvider>
  </Router>
);

export default AppRouter;
