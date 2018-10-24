require("dotenv").config();
// eslint-disable-next-line
const passport = require("passport");
const router = require("express").Router();
const deviceController = require("../../controllers/deviceController");
const FitbitApiClient = require("fitbit-node");
const misfit = require("node-misfit");
// eslint-disable-next-line
const db = require("../../models");

const client = new FitbitApiClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  apiVersion: "1.2"
});

// eslint-disable-next-line
const misfitHandler = new misfit({
  clientId: process.env.MFCLIENT_ID,
  clientSecret: process.env.MFCLIENT_SECRET,
  redirectUri: "http://localhost:3001/api/devices/misfit/callback",
  scope: "tracking"
});

router.route("/misfit/callback").get((req, res) => {
  let regUser = req.query.state;
  console.log("state: ", regUser);
  misfitHandler.getAccessToken(req.query.code, function(err, token) {
    console.log("token: ", token);
    console.log("user: ", regUser);
    deviceController.insertMFcodes(token, regUser);
  });
  res.redirect("http://localhost:3000/events");
});

// Matches with "/api/devices/fitbit/callback"
router.route("/fitbit/callback").get((req, res) => {
  let regUser = req.query.state;
  console.log("state: ", regUser);
  client
    .getAccessToken(
      req.query.code,
      "http://localhost:3001/api/devices/fitbit/callback"
    )
    .then(result => {
      console.log("refresh: ", result.refresh_token);
      result.state = regUser;
      console.log("statetop: ", result.state);
      console.log("token: ", result.access_token);
      deviceController
        .insertFBcodes(result)
        .then(res.send("202"))
        .catch(err => {
          res.status(err.status).send(err);
        });
    })
    .then(res.redirect("http://localhost:3000/events"))
    .catch(err => {
      res.status(err.status).send(err);
    });
});

//Matches with /api/devices/challenge/:id
router.route("/challenge/:id").get(deviceController.findChallengeById);

module.exports = router;
