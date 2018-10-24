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
  getAllUsers: function() {
    return axios.get("/api/users");
  },
  getUserById: function(id) {
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
  logout: function() {
    return axios.get("/api/users/logout");
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  createUser: function(userObj) {
    //console.log("Stuffing this: ", userObj);
    return axios.post("/api/users/register", userObj);
  },
  createChallenge: function(challengeObj) {
    //console.log("Stuffing this to challenge: ", challengeObj);
    return axios.post("/api/challenges", challengeObj);
  },
  updateChallenge: function(id, record) {
    //console.log("updating this challenge id = ", id, " record = ", record);
    return axios.put("/api/challenges/" + id, record);
  },
  getAllChallenges: function() {
    return axios.get("/api/challenges/");
  },
  getChallengesById: function(id) {
    //console.log("getting this challenge ", id)
    return axios.get("/api/challenges/" + id);
  },
  getChallengesNotJoined: function(id) {
    //console.log("Getting challenges this user not in  ", id)
    return axios.get("/api/challenges/notchallengeID/" + id);
  },
  getChallengedByUserId: function(id) {
    console.log("getting events for ", id);

    // Grab this guy's user data
    return axios.get("/api/challenges/challengeID/" + id);
  },
  getAllStepsByUserId: function(id) {
    console.log("getting steps for ", id);

    // Grab this guy's user data
    return axios.get("/api/devices/challengeID/" + id);
  },
  redirectOn401: function(err, props) {
    if (err.response.status === 401) {
      props.history.push("/");
    }
    console.log(err);
  }
};
