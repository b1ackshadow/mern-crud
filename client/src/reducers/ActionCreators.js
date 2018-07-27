const baseUrl = "http://localhost:5000/";
export const addPosts = posts => ({
  type: "ADD_POST",
  data: posts
});
export const newPost = (author, body) => dispatch => {
  const newPostObj = {
    author,
    body
  };
  return fetch(baseUrl + "post/", {
    mode: "cors",
    method: "post",
    body: JSON.stringify(newPostObj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(post => {
      return dispatch(addPosts(post));
    })
    .catch(error => console.log(error));
};
export const fetchPosts = () => dispatch => {
  return fetch(baseUrl, {
    mode: "cors"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(posts => {
      return dispatch(addPosts(posts));
    })
    .catch(error => console.log("hwy" + error));
};

export const deletePost = postid => dispatch => {
  return fetch(baseUrl + "post/" + postid + "?_method=DELETE", {
    mode: "cors",
    method: "post"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(postid => {
      return dispatch(removePost(postid));
    })
    .catch(error => console.log(error));
};

export const removePost = postid => ({
  type: "REMOVE_POST",
  postid
});

export const editPost = (postid, author, body) => dispatch => {
  const Obj = {
    author,
    body
  };
  return fetch(baseUrl + "post/" + postid + "/?_method=PUT", {
    mode: "cors",
    method: "post",
    body: JSON.stringify(Obj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(post => {
      console.log("UODATed post" + JSON.stringify(post));
      return dispatch(updatePost(post));
    })
    .catch(error => console.log(error));
};

export const updatePost = post => ({
  type: "UPDATE_POST",
  post
});

//Register user

export const registerUser = (email, name, password) => dispatch => {
  const userObj = {
    email,
    password,
    name
  };
  return fetch(baseUrl + "register", {
    mode: "cors",
    method: "post",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(user => {
      console.log("New user" + JSON.stringify(user));
      return dispatch(addNewUser(JSON.stringify(user)));
    })
    .catch(error => console.log(error));
};

export const addNewUser = user => ({
  type: "ADD_USER",
  name: user.name,
  _id: user._id
});
