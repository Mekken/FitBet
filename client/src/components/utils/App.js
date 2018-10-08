import axios from "axios";

export default {
  getUsers: function() {
    return axios.get("/api/users");
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteNote: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userObj) {
    console.log("Stuffing this: ", userObj);
    return axios.post("/api/users", userObj);
  },
  saveChallenge: function(challengeObj) {
    console.log("Stuffing this to challenge: ", challengeObj);
    return axios.post("/api/challenges", challengeObj);
  },
  getChallenges: function() {
    console.log("Getting all challenges");
    return axios.get("/api/challenges");
  },
  getChallenge: function(id) {
    console.log("getting this challenge ", id)
    return axios.get("/api/challenges/" + id);
  },
};
