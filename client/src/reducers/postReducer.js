const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return state.concat(action.data);
    case "REMOVE_POST":
      return state.filter(post => post._id !== action.postid);
    case "EDIT_POST":
      return state.map(
        post =>
          post._id === action.id ? { ...post, editing: !post.editing } : post
      );
    case "UPDATE_POST":
      return state.map(post => {
        if (post._id === action.post._id) {
          return {
            ...post,
            _id: action.post._id,
            author: action.post.author,
            body: action.post.body,
            editing: !post.editing
          };
        } else return post;
      });
    default:
      return state;
  }
};
export default postReducer;
