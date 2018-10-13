import axios from "axios";

export default {
  getUsers: function() {
    return axios.get("/api/users");
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  updateUser: function(id, data) {
    console.log("Id to update: ", id);
    console.log("data inserting ", data);
    return axios.put("/api/users/" + id, data);
  },
  login: function(loginObj) {
    return axios.post("/api/users/login", loginObj);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userObj) {
    console.log("Stuffing this: ", userObj);
    return axios.post("/api/users/register", userObj);
  },
  saveChallenge: function(challengeObj) {
    console.log("Stuffing this to challenge: ", challengeObj);
    return axios.post("/api/challenges", challengeObj);
  },
  updateChallenge: function(id, record) {
    console.log("updating this challenge id = ", id, " record = ", record);
    return axios.put("/api/challenges/" + id, record);
  },
  getChallenges: function() {
    return axios.get("/api/challenges/");
  },
  getChallenge: function(id) {
    console.log("getting this challenge ", id)
    return axios.get("/api/challenges/challengeID/" + id);
  },
  getMyEvents: function(id) {
    console.log("getting events for ", id)

    //{ players: { $elemMatch: { _id: "5bc1555bd7bacf81743af5f3"}}}
    /*
    let searching = "players: { $elemMatch: { _id: '" + id + "'}}"

    let req = {
      query: searching
    };
    */

    // Grab this guy's user data
    return axios.get("/api/challenges/" + id);
    /*
    .then(function(response) {
      console.log("Obj returned ", response);
    })
    .catch(function (error) {
      console.log(error);
    });
    */
  }
};
