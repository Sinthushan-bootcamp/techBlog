const { User } = require('../models');

const userData = [
  {
    username: 'test01',
    password: 'wilmott2',
  },
];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true,});

module.exports = seedUser;
