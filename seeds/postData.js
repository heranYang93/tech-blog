const { Post } = require("../models");

const postSeed = [
  {
    title: "Post 0 Title",
    content: "Post 0 content",
    last_update: "01/02/2022",
    user_id: 1,
  },
  {
    title: "Post 1 Title",
    content: "Post 1 content",
    last_update: "02/02/2022",
    user_id: 2,
  },
  {
    title: "Post 2 Title",
    content: "Post 2 content",
    last_update: "02/02/2022",
    user_id: 6,
  },
  {
    title: "Post 3 Title",
    content: "Post 3 content",
    last_update: "02/02/2022",
    user_id: 4,
  },
  {
    title: "Post 4 Title",
    content: "Post 4 content",
    last_update: "02/02/2022",
    user_id: 3,
  },
  {
    title: "Post 5 Title",
    content: "Post 5 content",
    last_update: "02/02/2022",
    user_id: 1,
  },
];

const seedPost = () => Post.bulkCreate(postSeed);

module.exports = seedPost;
