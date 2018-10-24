const mongoose = require("mongoose");
const db = require("../models");

// This file empties the users collection and inserts the users below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitlist");

/*
const userSeed = [
  {
    emailaddress: "annette.beatty@gmail.com",
    password: "$2b$10$bdG2CYItXENG5uxuCL3bJeOxAZI3gqyVu/xq9FvDz.my7tl0TKdIy",
    nickname: "annette",
    cellphone: "+18587752704",
    deviceToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkQ4SFQiLCJzdWIiOiI1UlBMWloiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNTQwMjkxODg1LCJpYXQiOjE1NDAyNjMwODV9.fkq0B6z6ZzEDDDGBRoaAph4jljC2BpzxsQZD8vl41Ws",
    refreshToken:
      "041dcccea5ea23e0f14568068b22fe86948646f87fec35abefbc05301020d458",
    deviceType: "FitBit",
    passwordSalt: "$2b$10$bdG2CYItXENG5uxuCL3bJe",
    totalSteps: 0,
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
    totalSteps: 0,
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
    totalSteps: 0,
    challenges: ""
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(() => {
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(() => {
    //console.error(err);
    process.exit(1);
  });
*/

// This file empties the users collection and inserts the users below

const challengeSeed = [
  {
    title: "Annette's Challenge #1",
    desc: "Most steps in 2 weeks",
    stakes: "$20",
    startDate: "2018-10-14T07:00:00.000Z",
    endDatea: "2018-10-28T07:00:00.000Z",
    lastDate: "2018-10-21T04:12:12.738Z",
    players: [
      {
        _id: "5bd007ab23da3c7476a22d5f",
        name: "Annette",
        cell: "+18587752704",
        challengeSteps: 0
      },
      {
        _id: "5bd007ab23da3c7476a22d60",
        name: "John",
        cell: "+18583952704",
        challengeSteps: 0
      },
      {
        _id: "5bd00b0046232f77db1d820d",
        name: "Senyan",
        cell: "+18587752704",
        challengeSteps: 0
      },
      {
        _id: "5bd007ab23da3c7476a22d61",
        name: "DarnelTheTester",
        cell: "+19164960963",
        challengeSteps: 0
      }
    ],
    chat: [
      {
        date: "10-20-2018 21:22:02",
        name: "DarnelTheTester",
        text: "John's dog walking puts all of us at a disadvantage."
      },
      {
        date: "10-20-2018 21:22:51",
        name: "Annette",
        text: "I'm planning to start doing walking 1:1's."
      },
      {
        date: "10-20-2018 21:27:23",
        name: "John",
        text: "You all just need to get yourselves some pets."
      },
      {
        date: "10-20-2018 21:32:18",
        name: "Senyan",
        text: "I'm hoping all that walking on campus pays off."
      }
    ]
  },
  {
    title: "Spouse versus Spouse",
    desc: "Most steps in 2 weeks",
    stakes: "$20",
    startDate: "2018-10-14T07:00:00.000Z",
    endDatea: "2018-10-28T07:00:00.000Z",
    lastDate: "2018-10-21T04:12:12.738Z",
    players: [
      {
        _id: "5bd007ab23da3c7476a22d5f",
        name: "Annette",
        cell: "+18587752704",
        challengeSteps: 0
      },
      {
        _id: "5bd007ab23da3c7476a22d60",
        name: "John",
        cell: "+18583952704",
        challengeSteps: 0
      }
    ],
    chat: [
      {
        date: "10-20-2018 21:37:59",
        name: "John",
        text: "Are these stakes enough?  Should we up the bet?"
      },
      {
        date: "10-20-2018 21:38:51",
        name: "Annette",
        text: "Don't push your luck, buddy!"
      }
    ]
  }
];

db.Challenge.remove({})
  .then(() => db.Challenge.collection.insertMany(challengeSeed))
  .then(() => {
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(() => {
    //console.error(err);
    process.exit(1);
  });
