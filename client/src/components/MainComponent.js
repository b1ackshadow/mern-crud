import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Router,
  Switch,
  Route,
  Redirect,
  NavLink,
  Link
} from "react-router-dom";

//Components
import AllPost from "./AllPost";
import Register from "./RegisterComponent";

class Main extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Link className="center " to="/">
            Post It
          </Link>
          <Link className="right" to="/register">
            Register
          </Link>
        </div>

        <Route exact path="/" component={AllPost} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/" />
      </div>
    );
  }
}
export default Main;
