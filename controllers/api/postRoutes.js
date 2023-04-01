const router = require('express').Router();
const { Post } = require('../../models');
// route to create a post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({ // the author of the post will be automatically assigned to the logged in user that made the comment
      ...req.body,
      author_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to update a post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, 
      {
      where: { // the where clause checks if there is a post with the given id that belongs to the current logged in user
        id: req.params.id,
        author_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { // the where clause checks if there is a post with the given id that belongs to the current logged in user
        id: req.params.id,
        author_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;