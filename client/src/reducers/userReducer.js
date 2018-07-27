const userReducer = (
  state = {
    name: null,
    _id: null
  },
  action
) => {
  switch (action.type) {
    case "ADD_USER":
      return (state, action) => ({
        ...state,
        _id: action._id,
        name: action.name
      });
    default:
      return state;
  }
};

export default userReducer;
