const router = require('express').Router();
const { Comment } = require('../../models');

// route to create a comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      author_id: req.session.user_id, // the author of the comment will be automatically assigned to the logged in user that made the comment
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to update a comment
router.put('/:id', async (req, res) => {
  try {
    const postData = await Comment.update(req.body,
      {
      where: { // the where clause checks if there is a comment with the given id that belongs to the current logged in user
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

// route to delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Comment.destroy({
      where: { // the where clause checks if there is a comment with the given id that belongs to the current logged in user
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