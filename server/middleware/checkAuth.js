exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.redirect("/404");
  }
};
