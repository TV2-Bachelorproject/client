import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Productions from "./views/Productions";
import Login from "./views/Login";
import Programs from "./views/Programs";
import ProgramCredit from "./views/Programs/ProgramCredit";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/productions" component={Productions} />
      <Route path="/programs" component={Programs} />
      <Route path="/program/:id" component={ProgramCredit} />
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </Router>
);
