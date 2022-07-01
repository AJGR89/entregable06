const checkLogged = (req, res, next) => {
    if (req.session?.logged) {
      return next();
    }
    return res.redirect("/login");
  };

module.exports = {checkLogged} 