import React, { Component } from "react";
import { connect } from "react-redux";
import { newPost } from "./reducers/ActionCreators";
class PostForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const author = this.getTitle.value;
    const body = this.getMessage.value;

    this.props.dispatch(newPost(author, body));
    this.getTitle.value = "";
    this.getMessage.value = "";
  };
  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">Create Post</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            ref={input => (this.getTitle = input)}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={input => (this.getMessage = input)}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Post</button>
        </form>
      </div>
    );
  }
}
export default connect()(PostForm);
