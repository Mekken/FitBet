const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  stakes: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  lastDate: { type: Date, default: Date.now },
  players: [{
      _id: { type: String },
      name: { type: String },
      challenge_steps: { type: Number }
  }]
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;