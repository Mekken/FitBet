import axios from "axios";

export default {
  login: function(loginObj) {
    return axios.post("/api/users/login", loginObj);
  },
  getUser: function() {
    return axios.get("/api/");
  },
  // Deletes the user with the given id
  deleteNote: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userObj) {
    console.log("Stuffing this: ", userObj);
    return axios.post("/api/users/register", userObj);
  }
};
