const express = require("express");
const { Router } = express;
const { myProducts } = require("../daos/mongo.dao");
const { checkLogged } = require("../middlewares/auth");
const passport = require("passport");
const compression = require("compression");
const {getHome,
  renderSingup,
  postSingup,
  singupErr,
  renderLogin,
  postLogin,
  loginErr,
  logout,
  getInfo,
  infozip,} = require('../controllers/auth.controller')

const router = Router();

/* INDEX */
router.get("/", getHome);

/* get SINGUP */
router.get("/signup", renderSingup);

/* post SINGUP */
router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  postSingup
);

/* get SINGUP */
router.get("/failsignup", singupErr);

/* SIGNUP error */
router.get("/signuperr", singupErr);

/* get LOGIN */
router.get("/login", renderLogin);

/* post LOGIN */
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginerr" }),
  postLogin
);

/* LOGIN error */
router.get("/loginerr", loginErr);

/* LOGOUT */
router.get("/logout", logout);

/* get INFO */
router.get("/info", getInfo);

/* get INFO gzip */
router.get("/infogzip", compression(), infozip);

module.exports = router;
