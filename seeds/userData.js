const { User } = require('../models');

const userData = [
  {
    username: 'Sinthushan',
    password: 'wilmott2',
  },
  {
    username: 'Edward',
    password: 'wilmott2',
  },
];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true,});

module.exports = seedUser;
