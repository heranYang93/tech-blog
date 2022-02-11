const router = require("express").Router();

const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/user", userRoutes);

module.exports = router;
