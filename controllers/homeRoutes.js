const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const findPosts = await Post.findAll({
      include: [
        {
          model: User,
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
    res.status(500).json(err.message);
  }
});

module.exports = router;
