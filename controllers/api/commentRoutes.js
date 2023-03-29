const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const postData = await Comment.update(req.body,
      {
      where: {
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


router.delete('/:id', async (req, res) => {
  try {
    const postData = await Comment.destroy({
      where: {
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