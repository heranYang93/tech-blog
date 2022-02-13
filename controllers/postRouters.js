const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbSinglePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "title", "content", "created_at", "updated_at"],
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

    req.session.save(() => {
      req.session.visitedPost = postData.id;
    });

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

//new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      title: req.body.commentTitle,
      content: req.body.commentContent,
      post_id: req.session.visitedPost,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
