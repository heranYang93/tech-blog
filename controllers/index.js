const router = require("express").Router();

const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");
const postRoutes = require("./postRouters");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/", homeRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
