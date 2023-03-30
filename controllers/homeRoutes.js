const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
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

    res.render('homepage', {
      posts, 
      loggedIn: req.session.loggedIn,
      title: "The Tech Blog"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/', withAuth,async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Post,
            attributes: ['id','title','created_date'],
          },
        ],
      });
      const user = userData.get({ plain: true });
      res.render('dashboard', { 
        user, 
        loggedIn: req.session.loggedIn,
        title: "Your Dashboard",
       });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

});

router.get('/post/create/',withAuth, async (req, res) => {
  try {
    res.render('createPost', { loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/update/:id',withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    if (post.author_id === req.session.user_id){
      res.render('updatePost', { post, loggedIn: req.session.loggedIn });
      return;
    }
    res.status(403).json({ message: 'You cannot access this post' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id',withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      const post = postData.get({ plain: true });

      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});





router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});
  
  module.exports = router;