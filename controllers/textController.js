// Read and set environment variables
require("dotenv").config();

const twilioSid = process.env.TWILIO_SID;
const twilioToken = process.env.TWILIO_TOKEN;

const client = require("twilio")(twilioSid, twilioToken);

// Defining methods for the fitController
module.exports = {
  create: function(req, res) {
    // Keep standard start message and just add their text
    var msg =
      "FitBet https://fitbet.herokuapp.com: (" +
      req.body.title +
      ") - " +
      req.body.text;

    // Send a text
    client.messages
      .create({
        body: msg,
        from: "+18582951090",
        to: req.body.cell
      })
      .then(message => res.json(message.sid))
      .done();
  }
};
