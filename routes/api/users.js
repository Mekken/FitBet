const router = require("express").Router();
const fitController = require("../../controllers/fitController");

// Matches with "/api/users"
router.route("/")
  .get(fitController.findAll)
  .post(fitController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(fitController.findById)
  .put(fitController.update)
  .delete(fitController.remove);

module.exports = router;
