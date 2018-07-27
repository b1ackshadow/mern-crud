import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost } from "../reducers/ActionCreators";
class Post extends Component {
  render() {
    return (
      <div className="post">
        {console.log(this.props.user.name)}
        <h2 className="post_title">{this.props.post.author}</h2>
        <p className="post_message">{this.props.post.body}</p>
        <div className="control-buttons">
          <button
            className="edit"
            onClick={() =>
              this.props.dispatch({
                type: "EDIT_POST",
                id: this.props.post._id
              })
            }
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => this.props.dispatch(deletePost(this.props.post._id))}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Post);
