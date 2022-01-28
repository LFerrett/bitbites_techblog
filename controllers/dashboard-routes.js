const router = require("express").Router();
const { Post, User } = require("../models/");
const withAuth = require("../utils/auth");

// GET all posts for dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

// Creat post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, { 
      include: [{ model: User, attributes: { exclude: ['password'] } }], 
      where: User.id = req.session.userId });
    const post = postData.get({ plain: true });
    console.log(post)
    res.render('single-post', { ...post, loggedIn: req.session.loggedIn });

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
