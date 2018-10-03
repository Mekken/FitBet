const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/fitlist"
);

const userSeed = [
  {
    emailaddress: "annette.beatty@gmail.com",
    password: "fredfred",
    nickname: "annette",
    cellphone: "8587752704",
    deviceToken: "123456789"
  },
  {
    emailaddress: "john@jbeatty.com",
    password: "fredfred",
    nickname: "john",
    cellphone: "8583952704",
    deviceToken: "987654321"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
