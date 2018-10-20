import axios from "axios";

export default {
  // Calls node server to send text
  textUsers: function(title, playersObj, msg) {
    // Send this text to everyone who is in this challenge
    for (var i = 0; i < playersObj.length; i++) {
      let textObj = {
        title: title,
        cell: playersObj[i].cell,
        text: msg
      };

      // Send off to text end point
      axios.post("/api/text", textObj);
    }
  },
  getUsers: function() {
    return axios.get("/api/users");
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  updateUser: function(id, data) {
    //console.log("Id to update: ", id);
    //console.log("data inserting ", data);
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
    //console.log("Stuffing this: ", userObj);
    return axios.post("/api/users/register", userObj);
  },
  saveChallenge: function(challengeObj) {
    //console.log("Stuffing this to challenge: ", challengeObj);
    return axios.post("/api/challenges", challengeObj);
  },
  updateChallenge: function(id, record) {
    //console.log("updating this challenge id = ", id, " record = ", record);
    return axios.put("/api/challenges/" + id, record);
  },
  getChallenges: function() {
    return axios.get("/api/challenges/");
  },
  getChallenge: function(id) {
    //console.log("getting this challenge ", id)
    return axios.get("/api/challenges/" + id);
  },
  getNotChallenge: function(id) {
    //console.log("Getting challenges this user not in  ", id)
    return axios.get("/api/challenges/notchallengeID/" + id);
  },
  getMyEvents: function(id) {
    //console.log("getting events for ", id)

    // Grab this guy's user data
    return axios.get("/api/challenges/challengeID/" + id);
  }
};
