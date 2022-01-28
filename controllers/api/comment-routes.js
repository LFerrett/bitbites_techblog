const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
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
  try {
    const newComment = await Comment.create({
      comment_content: req.body.comment_content,
      post_id: req.body.post_id,
      user_id: req.session.userId
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
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