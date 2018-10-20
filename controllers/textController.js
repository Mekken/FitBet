//var twilioSid = process.env.TWILIO_SID;
//var twilioToken = process.env.TWILIO_TOKEN;
const twilioSid = "AC5b6619d067d9e174372a8044c602cc43";
const twilioToken = "0b8392a77a1a8425327ac343ee3a4f26";

// Read and set environment variables
require("dotenv").config();

console.log("SID ", process.env.TWILIO_SID);
console.log("TOKEN ", process.env.TWILIO_TOKEN);

const client = require("twilio")(twilioSid, twilioToken);

// Defining methods for the fitController
module.exports = {
  create: function(req, res) {
    console.log("text = ", req.body.text);
    console.log("cell = ", req.body.cell);
    var msg = "FitBet: Update to " + req.body.text + "  challenge - URL";
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
