// const { myProducts } = require("../daos/mongo.dao");
const { ProductService } = require("../services/product.service");
const { info } = require("compression");
const compression = require("compression");


class AuthController{
  constructor(){
    this.myProducts = new ProductService();
  }
  getHome = async (req, res) => {
    if (req.isAuthenticated()) {
      const allproducts = await this.myProducts.getAll();
      const products = JSON.parse(JSON.stringify(allproducts));
      const user = JSON.parse(JSON.stringify(req.user));
      // console.log(user)
      res.render("index", { products: products, name: user });
      // res.render('profileUser', { user: user, isUser:true })
    } else {
      res.redirect("login");
    }
  };
  
  renderSingup = (req, res) => {
    return res.render("signup", { layout: false });
  };
  
  postSingup = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.redirect("login");
    }
  };
  
  singupErr = (req, res) => {
    return res.render("siguperr", { layout: false });
  };
  
  renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("login");
    }
  };
  
  postLogin = (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.redirect("login");
    }
  };
  
  loginErr = (req, res) => {
    res.render("loginerr", { layout: false });
  };
  
  logout = (req, res) => {
    req.logout((err) => {
      if (!err) {
        res.redirect("login");
      }
    });
  };
  
  getInfo = (req, res) => {
    res.render("info", { info: info, layout: false });
  };
  
  infozip = (req, res) => {
    // app.use(compression());
    res.render("info", { info: info, layout: false });
  };
}

module.exports = {
  AuthController
};
