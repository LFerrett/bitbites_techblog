const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{
        model: Post,
        attributes: ["id", "title", "content", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },]
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!userData) {
      res.status(404).json({ message: 'No User found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
// Added comments describing the functionality of this `login` route
router.post("/login", async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: "Login failed. Please try again!" });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({ message: "Login failed. Please try again!" });
      return;
    }
    // if they do match, return success message
    res.status(200).json({ message: "You are now logged in!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.render("homepage");
  } else {
    res.status(404).end();
  }
});

module.exports = router;
