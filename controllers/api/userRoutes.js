const router = require('express').Router();
const { User } = require('../../models');

// route to Create a new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({ // a new user needs a username and password
      username: req.body.username,
      password: req.body.password,
    });
    // once the new user has been created we create a new session so that the user remains logged in
    req.session.save(() => {
      req.session.loggedIn = true; // create a loggedIn session variable and set it to True
      req.session.user_id = dbUserData.id; // create a user_id session variable and set it to the newly created user's id
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route to login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ //find a user by the username
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password); // use the User instance method to check the provided password
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // once the password is verified we create a new session so that the user remains logged in
    req.session.save(() => {
      req.session.loggedIn = true; // create a loggedIn session variable and set it to True
      req.session.user_id = dbUserData.id; // create a user_id session variable and set it to the newly created user's id
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route to log user out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) { //make sure the user is actually logged in
    req.session.destroy(() => {  //logging out consist of destroy the session
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;