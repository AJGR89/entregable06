const express = require("express");
const { Router } = express;
const { myProducts } = require("../database");
const { checkLogged } = require("../middlewares/auth");
const passport = require("passport");

const router = Router();

/* INDEX */
router.get("/", async (req, res) => {
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
});

/* get SINGUP */
router.get("/signup", (req, res) => {
  return res.render("signup", { layout: false });
});

/* post SINGUP */
router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.redirect("login");
    }
  }
);

/* get SINGUP */
router.get("/failsignup", (req, res) => {
  return res.render("siguperr", { layout: false });
});

/* SIGNUP error */
router.get("/signuperr", (req, res) => {
  res.render("signuperr", { layout: false });
});

/* get LOGIN */
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

/* post LOGIN */
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginerr" }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.redirect("login");
    }
  }
);

/* LOGIN error */
router.get("/loginerr", (req, res) => {
  res.render("loginerr", { layout: false });
});

/* LOGOUT */
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("login");
    }
  });
});

module.exports = router;
