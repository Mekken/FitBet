const router = require("express").Router();
const userRoutes = require("./users");

// FitBet routes
router.use("/users", userRoutes);

module.exports = router;
