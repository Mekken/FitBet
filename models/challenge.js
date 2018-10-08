const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  stakes: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  lastDate: { type: Date, default: Date.now },
  players: [{
      _id: { type: String, required: true, unique: true },
      name: { type: String, required: true, unique: true },
      challenge_steps: { type: Number, required: true }
  }]
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;