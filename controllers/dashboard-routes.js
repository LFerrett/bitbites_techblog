const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts", {
      layout: "dashboard",
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: {
        model: Comment,
        include: { model: User, attributes: { exclude: "password" } },
      },
    });
    const post = postData.get({ plain: true });
    res.render("user-post", { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id/edit", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: { user_id: req.session.userId },
    });
    const post = postData.get({ plain: true });
    res.render("edit-post", { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

module.exports = router;
