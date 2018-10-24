// eslint-disable-next-line
const passport = require("passport");
const router = require("express").Router();
const deviceController = require("../../controllers/deviceController");
const FitbitApiClient = require("fitbit-node");
// eslint-disable-next-line
const db = require("../../models");

const client = new FitbitApiClient({
  clientId: "22D8HT",
  clientSecret: "3d4a6d06dd7f0cc939a3e91042a5fc9f",
  apiVersion: "1.2"
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
    .then(res.redirect("http://localhost:3000/login"))
    .catch(err => {
      res.status(err.status).send(err);
    });
});

//Matches with /api/devices/challenge/:id
router.route("/challenge/:id").get(deviceController.challengeCalc);

module.exports = router;
