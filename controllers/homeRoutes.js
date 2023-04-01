const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth'); //authentication middleware
// controller to handle request to / and renders the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ // gets all post and includes data for the users that created the posts
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', { // renders the homepage
      posts,  // pass in post data
      loggedIn: req.session.loggedIn, // pass in the logged in boolean
      title: "The Tech Blog" // pass the title to make it dynamic depending on the page
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// controller to handle request to /dashboard and renders the dashboard
// withAuth middleware ensure that the user is logged in, if not redirect to login page
router.get('/dashboard/', withAuth,async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, { //get user data for the current logged in user
        include: [ // include the post associated with the user
          {
            model: Post,
            attributes: ['id','title','created_date'],
          },
        ],
      });
      const user = userData.get({ plain: true });
      res.render('dashboard', { 
        user,  // pass in user data
        loggedIn: req.session.loggedIn, // pass in the logged in boolean
        title: "Your Dashboard", // pass the title to make it dynamic depending on the page
       });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

});
// controller to handle request to /post/create and renders page so user can create a post
// withAuth middleware ensure that the user is logged in, if not redirect to login page
router.get('/post/create/',withAuth, async (req, res) => {
  try {
    res.render('createPost', { loggedIn: req.session.loggedIn, title: "Your Dashboard"});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// controller to handle request to /post/update and renders page so user can update a selected post
// withAuth middleware ensure that the user is logged in, if not redirect to login page
router.get('/post/update/:id',withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id); //get post by id
    const post = postData.get({ plain: true });
    if (post.author_id === req.session.user_id){ //ensure that the user is indeed the author of the post
      res.render('updatePost', { post, loggedIn: req.session.loggedIn, title: "Your Dashboard" });
      return;
    }
    res.status(403).json({ message: 'You cannot access this post' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route render page to a given post
// withAuth middleware ensure that the user is logged in, if not redirect to login page
router.get('/post/:id',withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [ // for a given post we want to include the comments and the user data
          {
            model: Comment,
            attributes: ['id','content','created_date', 'author_id'],
            include: [{ // for each comment we want the user info for the comment author
              model: User
            }]
          },
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      const post = postData.get({ plain: true });
      res.render('post', { post, loggedIn: req.session.loggedIn, title: "The Tech Blog" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
// when user request /login route checks if user is already logged in if not renders login page
// if user is logged in they are returned to the homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
// when user request /signup route checks if user is already logged in if not renders login page
// if user is logged in they are returned to the homepage
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});
  
  module.exports = router;