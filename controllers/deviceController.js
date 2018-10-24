require("dotenv").config();
const db = require("../models");
const FitbitApiClient = require("fitbit-node");
const misfit = require("node-misfit");
var moment = require("moment");
// eslint-disable-next-line
var dbModel = [];

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

// Defining methods for the different devices
module.exports = {
  insertFBcodes: function(req, res) {
    console.log("FB insert req: ", req);
    db.User.findOneAndUpdate(
      { emailaddress: req.state },
      { deviceToken: req.access_token, refreshToken: req.refresh_token }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  insertMFcodes: function(token, regUser, res) {
    console.log("MF insert token/user: ", token, "/", regUser);
    db.User.findOneAndUpdate({ emailaddress: regUser }, { deviceToken: token })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.Challenge.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findChallengeByUserId: function(req, res) {
    db.Challenge.find({ players: { $elemMatch: { _id: req.params.id } } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findChallengeById: function(req, res) {
    db.Challenge.findById(req.params.id)
      .then(dbModel => getSteps(dbModel, 0, res))
      .catch(err => res.status(422).json(err));
  },
  stepsLifetimebyId: function(req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => getLifetime(dbUser, res))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Challenge.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User.replaceOne({ emailaddress: req.params.state }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Challenge.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
function getSteps(dbModel, playerNum, res) {
  if (playerNum < dbModel.players.length) {
    db.User.findById(dbModel.players[playerNum]._id)
      .then(dbUser => {
        if (dbUser.deviceType === "fitbit") {
          getFitBitSteps(dbModel, dbUser, playerNum, res);
        } else if (dbUser.deviceType === "misfit") {
          getMisFitSteps(dbModel, dbUser, playerNum, res);
        }
      })
      .catch(err => res.status(422).json(err));
  } else {
    res.json(dbModel);
  }
}

function getMisFitSteps(dbModel, dbUser, playerNum, res) {
  let startDate = moment(dbModel.startDate).format("YYYY-MM-DD");
  let endDate = moment(dbModel.endDate).format("YYYY-MM-DD");
  misfitHandler.getSummary(
    dbUser.deviceToken,
    startDate,
    endDate,
    { detail: true },
    function(err, output) {
      for (let s = 0; s < output.summary.length; s++) {
        dbModel.players[playerNum].challengeSteps += parseInt(
          output.summary[s].steps
        );
      }
      playerNum++;
      getSteps(dbModel, playerNum, res);
    }
  );
}

function getFitBitSteps(dbModel, dbUser, playerNum, res) {
  client
    .refreshAccessToken(dbUser.deviceToken, dbUser.refreshToken, "28800")
    .then(authOut => {
      console.log("**** completed Refresh, new token: ", authOut.refresh_token);
      db.User.findOneAndUpdate(
        { _id: dbUser._id },
        { refreshToken: authOut.refresh_token }
      )
        .then(dbOut => {
          console.log(dbOut);
          let startDate = moment(dbModel.startDate).format("YYYY-MM-DD");
          let endDate = moment(dbModel.endDate).format("YYYY-MM-DD");
          let stepReq =
            "/activities/tracker/steps/date/" +
            startDate +
            "/" +
            endDate +
            ".json";
          console.log("start: ", startDate);
          console.log("end: ", endDate);
          console.log("authout: ", authOut.refresh_token);
          client
            .get(stepReq, authOut.access_token)
            .then(results => {
              console.log("***** completed fetching step data - results: ");
              for (
                let s = 0;
                s < results[0]["activities-tracker-steps"].length;
                s++
              ) {
                dbModel.players[playerNum].challengeSteps += parseInt(
                  results[0]["activities-tracker-steps"][s].value
                );
              }
              playerNum++;
              getSteps(dbModel, playerNum, res);
            })
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err));
    });
}

function getLifetime(dbUser, res) {
  if (dbUser.deviceType === "fitbit") {
    client
      .refreshAccessToken(dbUser.deviceToken, dbUser.refreshToken, "28800")
      .then(authOut => {
        console.log(
          "**** completed Refresh, new token: ",
          authOut.refresh_token
        );
        db.User.findOneAndUpdate(
          { _id: dbUser._id },
          { refreshToken: authOut.refresh_token }
        )
          .then(dbOut => {
            console.log(dbOut);
            client
              .get("/activities.json", authOut.access_token)
              .then(results => {
                let stepObject = { steps: results[0].lifetime.tracker.steps };
                console.log("lifetime: ", stepObject.steps);
                res.json(stepObject);
              })
              .catch(err => res.status(422).json(err));
          })
          .catch(err => res.status(422).json(err));
      });
  } else {
    misfitHandler.getSummary(
      dbUser.deviceToken,
      "2018-10-01",
      moment().format("YYYY-MM-DD"),
      function(err, output) {
        let stepObject = { steps: output.steps };
        res.json(stepObject);
      }
    );
  }
}
