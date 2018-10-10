const db = require("../models");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = {
  passportSetup: function() {
    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `done` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(
      new Strategy(
        {
          usernameField: "emailaddress",
          passwordField: "password"
        },
        function(emailaddress, password, done) {
          db.User.findOne({ emailaddress: emailaddress }, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }

            bcrypt.compare(password, user.password).then(bSamePass => {
              if (!bSamePass) {
                return done(null, false);
              }
              return done(null, user);
            });
          });
        }
      )
    );
  },
  passportSerializeSetup: function() {
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function(user, cb) {
      cb(null, user.emailaddress);
    });

    passport.deserializeUser(function(emailaddress, cb) {
      db.User.findOne({ emailaddress: emailaddress }, function(err, user) {
        if (err) {
          return cb(err);
        }
        cb(null, user);
      });
    });
  }
};
