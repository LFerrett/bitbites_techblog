const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({ include: { model: Post } });
    const comments = commentData.map(comment => comment.get({ plain: true }));
    console.log(comments)
    res.status(200).json(comments)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newComment = await Comment.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, { include: { model: Post } });
    const comment = commentData.get({ plain: true });
    res.status(200).json(comment)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;