const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbGetPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      // order: [["name", "ASC"]],
    });

    const postArr = dbGetPost.map((singlePost) => {
      const thisPostId = singlePost.id;
      const thisPostTitle = singlePost.title;
      const thisPostContent = singlePost.content;
      const thisPostCreate = singlePost.createdAt;
      const thisPostUpdate = singlePost.updatedAt;
      const thisPostCreatorId = singlePost.user.dataValues.id;
      const thisPostCreatorUsername = singlePost.user.dataValues.username;
      return {
        thisPostId,
        thisPostTitle,
        thisPostContent,
        thisPostCreate,
        thisPostUpdate,
        thisPostCreatorId,
        thisPostCreatorUsername,
      };
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

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
