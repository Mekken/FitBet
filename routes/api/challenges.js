const router = require("express").Router();
const challengeController = require("../../controllers/challengeController");
const authController = require("../../controllers/authController");

// Matches with "/api/challenges"
router
  .route("/")
  .get(authController.checkAuthentication, challengeController.findAll)
  .post(authController.checkAuthentication, challengeController.create);

// Matches with "/api/challenges/:id"
router
  .route("/:id")
  .get(
    authController.checkAuthentication,
    challengeController.findChallengeById
  )
  .put(authController.checkAuthentication, challengeController.update)
  .delete(authController.checkAuthentication, challengeController.remove);

// Matches with "/api/challenges/challengeID/:id"
router
  .route("/challengeID/:id")
  .get(
    authController.checkAuthentication,
    challengeController.findChallengeByUserId
  );

// Matches with "/api/challenges/notchallengeID/:id"
router
  .route("/notchallengeID/:id")
  .get(
    authController.checkAuthentication,
    challengeController.findNotChallengeByUserId
  );

module.exports = router;
