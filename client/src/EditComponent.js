import React, { Component } from "react";
import { connect } from "react-redux";
import { editPost, addPosts } from "./reducers/ActionCreators";

class EditComponent extends Component {
  handleEdit = e => {
    e.preventDefault();
    const author = this.getTitle.value;
    const body = this.getMessage.value;
    console.log(this.props.post._id + author + body);
    // const data = {
    //   author,
    //   body
    // };
    // this.props.dispatch({
    //   type: "UPDATE",
    //   id: this.props.post._id,
    //   data: data
    // });

    this.props.dispatch(editPost(this.props.post._id, author, body));
  };
  render() {
    return (
      <div key={this.props.post._id} className="post">
        <form className="form" onSubmit={this.handleEdit}>
          <input
            required
            type="text"
            ref={input => (this.getTitle = input)}
            defaultValue={this.props.post.author}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={input => (this.getMessage = input)}
            defaultValue={this.props.post.body}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Update</button>
        </form>
      </div>
    );
  }
}
export default connect()(EditComponent);
