const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// a User can have many post
User.hasMany(Post, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

// a post most have only one author
Post.belongsTo(User, {
  foreignKey: 'author_id'
});

//every post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// a comment belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// a User can make many comments
User.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// a comment can only have one author
Comment.belongsTo(User, {
  foreignKey: 'author_id'
});


module.exports = { User, Post, Comment };