const { User } = require("../models");

const userSeed = [
  {
    id: 0,
    username: "Heran Yang 0",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 1,
  },
  {
    id: 2,
    username: "Heran Yang 1",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 2,
  },

  {
    id: 3,
    username: "Heran Yang 2",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 3,
  },

  {
    id: 4,
    username: "Heran Yang 3",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 4,
  },

  {
    id: 5,
    username: "Heran Yang 4",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 5,
  },

  {
    id: 6,
    username: "Heran Yang 5",
    email: "heran.yang@gmail.com",
    password: "",
    post_id: 6,
  },
];

const seedUser = () => User.bulkCreate(userSeed);

module.exports = seedUser;
