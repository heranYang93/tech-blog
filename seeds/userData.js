const { User } = require("../models");

const userSeed = [
  {
    username: "Heran Yang 0",
    email: "heran.yang+1@gmail.com",
    password: "kujyhtgrfe",
  },
  {
    username: "Heran Yang 1",
    email: "heran.yang+2@gmail.com",
    password: "65rytjukjthrxf",
  },

  {
    username: "Heran Yang 2",
    email: "heran.yang+3@gmail.com",
    password: "6543retgdfe",
  },

  {
    username: "Heran Yang 3",
    email: "heran.yang+4@gmail.com",
    password: "7i6u5rsyghtgfdgz",
  },

  {
    username: "Heran Yang 4",
    email: "heran.yang+5@gmail.com",
    password: "7654yrhtgehtr",
  },

  {
    username: "Heran Yang 5",
    email: "heran.yang+6@gmail.com",
    password: "87456y5ehtr",
  },
];

const seedUser = () => User.bulkCreate(userSeed);

module.exports = seedUser;
