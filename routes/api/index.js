const router = require("express").Router();
const userRoutes = require("./users");
const challengeRoutes = require("./challenges");
const textRoutes = require("./text");

// User routes
router.use("/users", userRoutes);
router.use("/challenges", challengeRoutes);
router.use("/text", textRoutes);

module.exports = router;
