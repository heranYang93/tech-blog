const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbSinglePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: comment,
          attributes: [
            "id",
            "title",
            "content",
            "last_update",
            "post_id",
            "user_id",
            "created_at",
            "updated_at",
          ],
        },
      ],
    });
    const singlePost = dbSinglePost.get({ plain: true });

    res.render("commentPage", {
      singlePost,
      logged_in: req.session.logged_in,
      userName: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
