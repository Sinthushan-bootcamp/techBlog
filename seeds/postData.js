const { Post } = require('../models');

const postData = [
  {
    title: 'testPost01',
    content: 'this is a test post',
    author_id: 1
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;