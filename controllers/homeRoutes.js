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

    const Posts = postData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      Posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', withAuth,async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: ['id','title','created_date'],
          },
        ],
      });
      const user = userData.get({ plain: true });
      res.render('dashboard', { user, loggedIn: req.session.loggedIn });
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
  
  module.exports = router;