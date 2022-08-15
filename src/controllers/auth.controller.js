const { myProducts } = require("../daos/mongo.dao");
const { info } = require("compression");
const compression = require("compression");


const getHome = async (req, res) => {
  if (req.isAuthenticated()) {
    const allproducts = await myProducts.getAll();
    const products = JSON.parse(JSON.stringify(allproducts));
    const user = JSON.parse(JSON.stringify(req.user));
    // console.log(user)
    res.render("index", { products: products, name: user });
    // res.render('profileUser', { user: user, isUser:true })
  } else {
    res.redirect("login");
  }
};

const renderSingup = (req, res) => {
  return res.render("signup", { layout: false });
};

const postSingup = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.redirect("login");
  }
};

const singupErr = (req, res) => {
  return res.render("siguperr", { layout: false });
};

const renderLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

const postLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.redirect("login");
  }
};

const loginErr = (req, res) => {
  res.render("loginerr", { layout: false });
};

const logout = (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("login");
    }
  });
};

const getInfo = (req, res) => {
  res.render("info", { info: info, layout: false });
};

const infozip = (req, res) => {
  // app.use(compression());
  res.render("info", { info: info, layout: false });
};

module.exports = {
  getHome,
  renderSingup,
  postSingup,
  singupErr,
  renderLogin,
  postLogin,
  loginErr,
  logout,
  getInfo,
  infozip,
};
