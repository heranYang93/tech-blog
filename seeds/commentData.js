const { Comment } = require("../models");

const commentSeed = [
  {
    title: "Comment 0 Title",
    content: "Comment 0 content",
    last_update: "01/02/2022",
    post_id: 1,
    user_id: 1,
  },
  {
    title: "Comment 1 Title",
    content: "Comment 1 content",
    last_update: "01/02/2022",
    post_id: 2,
    user_id: 2,
  },
  {
    title: "Comment 3 Title",
    content: "Comment 3 content",
    last_update: "01/02/2022",
    post_id: 1,
    user_id: 5,
  },
  {
    title: "Comment 4 Title",
    content: "Comment 4 content",
    last_update: "01/02/2022",
    post_id: 3,
    user_id: 5,
  },
  {
    title: "Comment 5 Title",
    content: "Comment 5 content",
    last_update: "01/02/2022",
    post_id: 2,
    user_id: 3,
  },
  {
    title: "Comment 6 Title",
    content: "Comment 6 content",
    last_update: "01/02/2022",
    post_id: 2,
    user_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentSeed);

module.exports = seedComment;
