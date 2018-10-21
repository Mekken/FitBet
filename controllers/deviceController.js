require("dotenv").config();
const db = require("../models");
const FitbitApiClient = require("fitbit-node");
var moment = require("moment");
// eslint-disable-next-line
var dbModel = [];

const client = new FitbitApiClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  apiVersion: "1.2"
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
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  challengeCalc: function(req, res) {
    console.log("Entering ChallengeCalc...");
    db.Challenge.find({ players: { $elemMatch: { _id: req.params.id } } })
      .then(dbModel => processChallenge(dbModel, 0, res))
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

function processChallenge(dbModel, procChal, res) {
  console.log("entering Process challenge number: ", procChal);
  console.log("challenge length: ", dbModel.length);
  if (procChal < dbModel.length) {
    processUser(dbModel, procChal, 0, res);
  } else {
    console.log("done");
    console.log("dbModel sent: ", dbModel);
    res.json(dbModel);
  }
}

function processUser(dbModel, procChal, procUser, res) {
  console.log(
    "entering Process User number: ",
    procUser,
    "of Challenge Number: ",
    procChal
  );
  if (procUser < dbModel[procChal].players.length) {
    processSteps(dbModel, procChal, procUser, res);
  } else {
    procChal++;
    processChallenge(dbModel, procChal, res);
  }
}

function processSteps(dbModel, procChal, procUser, res) {
  console.log(
    "entering Process Steps for User: ",
    procUser,
    "of Challenge Number: ",
    procChal
  );
  db.User.findById(dbModel[procChal].players[procUser]._id)
    .then(dbUser => {
      console.log("**** challenge num after find: ", procChal);
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
            // eslint-disable-next-line
            .then(dbOut => {
              let startDate = moment(dbModel[procChal].startDate).format(
                "YYYY-MM-DD"
              );
              let endDate = moment(dbModel[procChal].endDate).format(
                "YYYY-MM-DD"
              );
              let stepReq =
                "/activities/tracker/steps/date/" +
                startDate +
                "/" +
                endDate +
                ".json";
              console.log("start: ", startDate);
              console.log("end: ", endDate);

              client
                .get(stepReq, authOut.access_token)
                .then(results => {
                  console.log("***** completed fetching step data");
                  for (
                    let s = 0;
                    s < results[0]["activities-tracker-steps"].length;
                    s++
                  ) {
                    dbModel[procChal].players[
                      procUser
                    ].challengeSteps += parseInt(
                      results[0]["activities-tracker-steps"][s].value
                    );
                  }
                  console.log("**** DBMODEL: ", dbModel[procChal]);
                  procUser++;
                  processUser(dbModel, procChal, procUser, res);
                })
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
}
