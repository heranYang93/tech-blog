const router = require("express").Router();

const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");
const postRoutes = require("./postRouters");

router.use("/", homeRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);

module.exports = router;
