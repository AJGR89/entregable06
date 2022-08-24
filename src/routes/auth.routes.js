const express = require("express");
const { Router } = express;
// const { checkLogged } = require("../middlewares/auth");
const passport = require("passport");
const compression = require("compression");
const { AuthController } = require("../controllers/auth.controller");

const router = Router();

class RouterAuth {
  constructor() {
    this.authController = new AuthController();
  }
  start() {
    router.get("/", this.authController.getHome); /* INDEX */
    router.get("/signup", this.authController.renderSingup); /* get SINGUP */

    /* post SINGUP */
    router.post(
      "/signup",
      passport.authenticate("signup", { failureRedirect: "/failsignup" }),
      this.authController.postSingup
    );
    router.get("/failsignup", this.authController.singupErr); /* get SINGUP */
    router.get("/signuperr", this.authController.singupErr); /* SIGNUP error */
    router.get("/login", this.authController.renderLogin); /* get LOGIN */

    /* post LOGIN */
    router.post(
      "/login",
      passport.authenticate("login", { failureRedirect: "/loginerr" }),
      this.authController.postLogin
    );
    router.get("/loginerr", this.authController.loginErr); /* LOGIN error */
    router.get("/logout", this.authController.logout); /* LOGOUT */
    router.get("/info", this.authController.getInfo); /* get INFO */
    router.get(
      "/infogzip",
      compression(),
      this.authController.infozip
    ); /* get INFO gzip */
    return router;
  }
}

module.exports = { RouterAuth };
