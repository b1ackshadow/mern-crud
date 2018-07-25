import React, { Component } from "react";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import AllPost from "./AllPost";
import { fetchPosts } from "./reducers/ActionCreators";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchPosts());
  }
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2 className="center ">Post It</h2>
        </div>
        <PostForm />
        <AllPost />
      </div>
    );
  }
}
export default connect()(App);
