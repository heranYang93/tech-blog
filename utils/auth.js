const loginPageEndPt = "/user/login";

const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect(loginPageEndPt);
  } else {
    next();
  }
};

module.exports = withAuth;
