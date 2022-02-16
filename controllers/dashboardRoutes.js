const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  currentUserId = req.session.user_id;
  try {
    const dbFindRelatedPost = await Post.findAll({
      where: { user_id: currentUserId },
      order: [
        ["updated_at", "DESC"],
        ["created_at", "DESC"],
      ],
    });
    const postArr = dbFindRelatedPost.map((singlePostData) => {
      return {
        id: singlePostData.dataValues.id,
        title: singlePostData.dataValues.title,
        content: singlePostData.dataValues.content,
        user_id: singlePostData.dataValues.user_id,
        created_at: singlePostData.dataValues.createdAt,
        updated_at: singlePostData.dataValues.updatedAt,
      };
    });
    const dbFindRelatedComment = await Comment.findAll({
      where: { user_id: currentUserId },
    });
    const commentArr = dbFindRelatedComment.map((singleCommentData) => {
      return {
        id: singleCommentData.dataValues.id,
        title: singleCommentData.dataValues.title,
        content: singleCommentData.dataValues.content,
        post_id: singleCommentData.dataValues.post_id,
        user_id: singleCommentData.dataValues.user_id,
        created_at: singleCommentData.dataValues.createdAt,
        updated_at: singleCommentData.dataValues.updatedAt,
      };
    });

    const dashBoardRender = res.render("dashboardPage", {
      postArr,
      commentArr,
      logged_in: req.session.logged_in,
      userId: req.session.user_id,
      userName: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;

//open an edit page
router.get("/:id", withAuth, async (req, res) => {
  try {
    console.log("in Route", req.params.id);
    const dbFindThisPost = await Post.findByPk(req.params.id);
    const thisPostContent = dbFindThisPost.get({ plain: true });
    res.render("editPage", { thisPostContent });
  } catch (err) {
    console.log(err.message);
  }
});
