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
        _id: "5bce94c7ca8f8922e3c0b819",
        name: "Annette",
        cell: "+18587752704",
        challengeSteps: 0
      },
      {
        _id: "5bce94c7ca8f8922e3c0b81a",
        name: "John",
        cell: "+18583952704",
        challengeSteps: 0
      },
      {
        _id: "5bce94c7ca8f8922e3c0b81c",
        name: "Senyan",
        cell: "+18587752704",
        challengeSteps: 0
      },
      {
        _id: "5bce94c7ca8f8922e3c0b81b",
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
    title: "Annette's Challenge #1",
    desc: "Most steps in 2 weeks",
    stakes: "$20",
    startDate: "2018-10-14T07:00:00.000Z",
    endDatea: "2018-10-28T07:00:00.000Z",
    lastDate: "2018-10-21T04:12:12.738Z",
    players: [
      {
        _id: "5bce94c7ca8f8922e3c0b819",
        name: "Annette",
        cell: "+18587752704",
        challengeSteps: 0
      },
      {
        _id: "5bce94c7ca8f8922e3c0b81a",
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
  .then((/*data*/) => {
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((/*err*/) => {
    //console.error(err);
    process.exit(1);
  });
