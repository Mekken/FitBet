// Read and set environment variables
require("dotenv").config();

const twilioSid = process.env.TWILIO_SID;
const twilioToken = process.env.TWILIO_TOKEN;

const client = require("twilio")(twilioSid, twilioToken);

// Defining methods for the fitController
module.exports = {
  create: function(req, res) {
    console.log("text = ", req.body.text);
    console.log("cell = ", req.body.cell);
    var msg = "FitBet: " + req.body.text + "  challenge - <URL link here>";
    console.log("Texting this ", req.body.text);
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
