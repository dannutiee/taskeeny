import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {lightTheme} from "../themes/lightTheme";
import Dashboard from "../components/app/Dashboard";

const AppBody = styled.div`
  font-family: "Montserrat", sans-serif;
`;

export const history = createBrowserHistory();

const AppRouter = () => (
  <ThemeProvider theme={lightTheme}>
    <Router history={history}>
      <AppBody>
        <Switch>
          <Route path="/" component={Dashboard} exact={true} />
        </Switch>
      </AppBody>
    </Router>
  </ThemeProvider>
);

export default AppRouter;
