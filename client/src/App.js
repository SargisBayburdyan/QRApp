import React, { Fragment } from "react";
import Notifications from "react-notify-toast";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Routes from "./Routes";
import "./App.css";

export default class App extends React.Component {
  render() {
    const content = () => {
      return (
        <Router>
          <Fragment>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/user" />;
              }}
            />
            <Switch>
              <Route exact path="/:pageName" component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      );
    };
    return (
      <div className="container fadein">
        <Notifications />
        <main>{content()}</main>
      </div>
    );
  }
}
