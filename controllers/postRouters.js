const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbSinglePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "title",
            "content",
            "last_update",
            "created_at",
            "updated_at",
          ],
        },
      ],
    });
    const postData = dbSinglePost.get({ plain: true });

    const dbFindComments = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User }],
    });

    const commentData = dbFindComments.map((singleComment) => {
      const thisCommentTitle = singleComment.dataValues.title;
      const thisCommentContent = singleComment.dataValues.content;
      const thisCommentUpdate = singleComment.dataValues.createdAt;
      const thisCommentUserId = singleComment.dataValues.user.id;
      const thisCommentUsername = singleComment.dataValues.user.username;
      return {
        thisCommentTitle,
        thisCommentContent,
        thisCommentUpdate,
        thisCommentUserId,
        thisCommentUsername,
      };
    });

    console.log(req.session);

    const commentPage = res.render("commentPage", {
      postData,
      commentData,
      logged_in: req.session.logged_in,
      userId: req.session.user_id,
      userName: req.session.username,
      viewingPostId: postData.id,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//new post
router.post("/", withAuth, async (req, res) => {});

//new comment
router.post("/comment/", withAuth, async (req, res) => {
  commentorId = req.session.user_id;
  commentorUsername = req.session.username;
});

module.exports = router;
