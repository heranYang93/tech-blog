const { Post } = require("../models");

const postSeed = [
  {
    id: 0,
    username: "Heran Yang 0",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 1,
  },
];

const seedPost = () => Post.bulkCreate(postSeed);

module.exports = seedPost;
