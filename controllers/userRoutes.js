const router = require("express").Router();
const { User } = require("../models");

//log-in page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//sign-up page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

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
    } else {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
    }
    res.redirect("/user/login");
  } catch (err) {
    console.error(err.message);
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
