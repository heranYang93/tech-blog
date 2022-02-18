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
      req.session.visitedPost = req.params.id;
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
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

//new comment
router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body, req.session);

    const newComment = await Comment.create({
      title: req.body.commentTitle,
      content: req.body.commentContent,
      post_id: req.body.viewingPostId,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/mod/:id", withAuth, async (req, res) => {
  try {
    const modifyPost = await Post.update(
      {
        title: req.body.postReviseTitle,
        content: req.body.postReviseContent,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(modifyPost);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/del/:id", withAuth, async (req, res) => {
  try {
    const destroyPost = await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json(destroyPost);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
