const router = require("express").Router();
const challengeController = require("../../controllers/challengeController");

// Matches with "/api/challenges"
router.route("/")
  .get(challengeController.findAll)
  .post(challengeController.create);

// Matches with "/api/challenges/:id"
router
  .route("/:id")
  .get(challengeController.findById)
  .put(challengeController.update)
  .delete(challengeController.remove);

module.exports = router;