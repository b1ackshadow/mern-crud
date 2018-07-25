const baseUrl = "http://localhost:5000/";
export const addPosts = posts => ({
  type: "ADD_POST",
  data: posts
});
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
      console.log(posts);
      return dispatch(addPosts(posts));
    })
    .catch(error => console.log("hwy" + error));
};
