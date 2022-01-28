const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

// GET all posts
router.get("/", async (req, res) => {
  try {
   const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log("Can't get all posts");
    res.status(500).json(err);
  }
});

// Login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
