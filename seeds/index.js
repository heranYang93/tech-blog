const sequelize = require("../config/connection");
const seedPost = require("./galleryData");
//user data not ready
// const seedUser = require("./paintingData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPost();

  //   await seedUser();

  process.exit(0);
};

seedAll();
