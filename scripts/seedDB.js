const mongoose = require("mongoose");
const db = require("../models");

// This file empties the users collection and inserts the users below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/fitlist"
);

const userSeed = [
  {
    emailaddress: "annette.beatty@gmail.com",
    password: "$2b$10$bdG2CYItXENG5uxuCL3bJeOxAZI3gqyVu/xq9FvDz.my7tl0TKdIy",
    nickname: "annette",
    cellphone: "8587752704",
    deviceToken: "123456789",
    refreshToken: "123456789",
    deviceType: "FitBit",
    passwordSalt: "$2b$10$bdG2CYItXENG5uxuCL3bJe"
  },
  {
    emailaddress: "john@jbeatty.com",
    password: "$2b$10$bdG2CYItXENG5uxuCL3bJeOxAZI3gqyVu/xq9FvDz.my7tl0TKdIy",
    nickname: "john",
    cellphone: "8583952704",
    deviceToken: "987654321",
    refreshToken: "123456789",
    deviceType: "MisFit",
    passwordSalt: "$2b$10$bdG2CYItXENG5uxuCL3bJe"
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
