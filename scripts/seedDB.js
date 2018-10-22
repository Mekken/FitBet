const mongoose = require("mongoose");
const db = require("../models");

// This file empties the users collection and inserts the users below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitlist");

const userSeed = [
  {
    emailaddress: "annette.beatty@gmail.com",
    password: "$2b$10$bdG2CYItXENG5uxuCL3bJeOxAZI3gqyVu/xq9FvDz.my7tl0TKdIy",
    nickname: "annette",
    cellphone: "+18587752704",
    deviceToken: "123456789",
    refreshToken: "123456789",
    deviceType: "FitBit",
    passwordSalt: "$2b$10$bdG2CYItXENG5uxuCL3bJe",
    challenges: ""
  },
  {
    emailaddress: "john@jbeatty.com",
    password: "$2b$10$bdG2CYItXENG5uxuCL3bJeOxAZI3gqyVu/xq9FvDz.my7tl0TKdIy",
    nickname: "john",
    cellphone: "+18583952704",
    deviceToken: "987654321",
    refreshToken: "123456789",
    deviceType: "MisFit",
    passwordSalt: "$2b$10$bdG2CYItXENG5uxuCL3bJe",
    challenges: ""
  },
  {
    emailaddress: "dheardjr@gmail.com",
    password: "$2b$10$DlLhKMbaZY5H03tOIl2M8eMo3zeKK/g9ckMZqwQ6oFNHrdNVhn7ce",
    nickname: "DarnelTheTester",
    cellphone: "+18587752704",
    deviceType: "fitbit",
    deviceToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkQ4SFQiLCJzdWIiOiI0Q01MM1kiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNTQwMjE0NTg2LCJpYXQiOjE1NDAxODU3ODZ9.T72GiDiONTW000_t09guWSJTQCKWttFZ9UYwqSrNEm0",
    refreshToken:
      "1ff5abb676c50654da18236637332f42a64cbb41b9f73dd0c0f59fe6425be455",
    passwordSalt: "$2b$10$DlLhKMbaZY5H03tOIl2M8e",
    challenges: ""
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((/*data*/) => {
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((/*err*/) => {
    //console.error(err);
    process.exit(1);
  });
