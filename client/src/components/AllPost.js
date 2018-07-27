import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditComponent";
import PostForm from "./PostForm";
import { fetchPosts } from "../reducers/ActionCreators";

<PostForm />;

class AllPost extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  render() {
    return (
      <div>
        {console.log("curreant user" + JSON.stringify(this.props.user))}
        <PostForm />
        <h1 className="post_heading">All Posts</h1>
        {this.props.posts.map((post, i) => {
          return (
            <div key={post._id}>
              {post.editing ? (
                <EditComponent post={post} key={post._id} />
              ) : (
                <Post post={post} key={post._id} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    user: state.user
  };
};
export default connect(mapStateToProps)(AllPost);
