const express = require("express");
const { Router } = express;
const {myProducts} = require('../database')
const {checkLogged} = require('../middlewares/auth');

const router = Router();

/* INDEX */
router.get("/", checkLogged, async (req, res) => {
  console.log("en index");
  const allproducts = await myProducts.getAll();
  const products = JSON.parse(JSON.stringify(allproducts))
  console.log(products);
  res.render("index",{products:products,name:req.session.user});
});

/* LOGIN */
router.get("/login", (req, res) => {
  const { userlogin, passuser } = req.query;
//   console.log("en login");
//   console.log("userlogin, passuser", userlogin, passuser);
  if (!userlogin && !passuser) {
    return res.render("login", { layout: false });
  }
  if (userlogin == "Miles" && passuser == "pssmiles") {
    req.session.user = userlogin;
    req.session.admin = true;
    req.session.logged = true;
  } else if (userlogin == "John" && passuser == "pssjohn") {
    req.session.user = userlogin;
    req.session.logged = true;
  } else {
    return res.send("Usuario o contraseña incorrecto");
  }

  return res.redirect("/");
});

/* LOGOUT */
router.get("/logout", checkLogged , (req, res) => {
    const name = req.session.user;
  req.session.destroy((error) => {
    if (error) {
      res.send({ status: "Logout Error", body: error });
    }
  });

  res.render('logout',{name:name});
});

module.exports = router;
