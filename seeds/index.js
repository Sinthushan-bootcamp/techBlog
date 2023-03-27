const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPosts = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPosts();

  process.exit(0);
};

seedAll();
