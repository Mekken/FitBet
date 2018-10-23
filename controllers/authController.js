const db = require("../models");
const bcrypt = require("bcrypt");

// Defining methods for the fitController
module.exports = {
  serializeAccount: function(req, res) {
    let body = req.body,
      password = body.password,
      saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) {
        throw err;
      }

      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          throw err;
        }
        body.password = hash;
        body.passwordSalt = salt;
        db.User.create(body)
          .then(dbModel => res.json(dbModel))
          .catch(err => {
            let errMsg = err.errmsg;
            if (errMsg.includes("duplicate key")) {
              errMsg = "Duplicate Key Error";
            }

            res
              .status(422)
              .send(errMsg)
              .end();
          });
      });
    });
  },
  checkAuthentication: function(req, res, next) {
    if (req.user) {
      res.status(200);
      next();
    } else {
      res.status(401).end();
    }
  }
};
