const router = require("express").Router();
const { User } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    //check email availability
    const ce = await User.findOne({
      where: { email: req.body.email },
    });
    //check username availability
    const cu = await User.findOne({
      where: { username: req.body.username },
    });

    if (ce || cu) {
      //if either email or username exist
      res.json({
        message: "Account already exist, please choose new email or user name",
      });
      return;
    } else {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
    }

    const userData = await User.findOne({ where: { email: req.body.email } });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: `Account created! You are now logged in as ${req.body.username}`,
      });
    });
  } catch (err) {
    console.error("error from account creation");
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: `You are now logged in as ${req.session.username}`,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
