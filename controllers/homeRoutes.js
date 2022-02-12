const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const findPosts = await Post.findAll({
      include: [
        {
          model: user,
          attributes: ["id", "username", "email", "password"],
        },
      ],
    });
    const postArr = findPosts.map((singlePost) => {
      singlePost.get({ plain: true });
    });
    res.render("homepage", {
      postArr,
      logged_in: req.session.logged_in,
      userName: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
