import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Productions from "./views/Productions";
import Login from "./views/Login";
import Programs from "./views/Programs";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Productions} />
      <Route path="/productions" component={Productions} />
      <Route path="/programs" component={Programs} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);
