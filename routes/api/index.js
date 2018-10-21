const router = require("express").Router();
const userRoutes = require("./users");
const challengeRoutes = require("./challenges");
const textRoutes = require("./text");
const devicesRoutes = require("./devices");

// User routes
router.use("/users", userRoutes);
router.use("/challenges", challengeRoutes);
router.use("/text", textRoutes);
router.use("/devices", devicesRoutes);

module.exports = router;
