const router = require("express").Router();
const { User } = require("../../models");

// Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect login information" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.json({ userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Signup
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
