const passport = require("passport");
const router = require("express").Router();
const fitController = require("../../controllers/fitController");
const authController = require("../../controllers/authController");

// Matches with "/api/users"
router
  .route("/")
  .get(authController.checkAuthentication, fitController.findAll);

// Matches with "/api/users/register"
router.route("/register").post(fitController.create);

// Matches with "/api/users/login"
router.route("/login").post(passport.authenticate("local"), (req, res) => {
  let userInfo = {
    id: req.user._id,
    nickname: req.user.nickname
  };
  res.json(userInfo);
  res.status(200).end();
});

// Matches with "/api/users/logout"
router.route("/logout").get(authController.checkAuthentication, (req, res) => {
  req.logout();
  res.status(200).end();
});

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(authController.checkAuthentication, fitController.findById)
  .put(authController.checkAuthentication, fitController.update)
  .delete(authController.checkAuthentication, fitController.remove);

module.exports = router;
