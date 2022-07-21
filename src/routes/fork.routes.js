const express = require("express");
const { fork } = require("child_process");
const { query } = require("express");
const { Router } = express;
const path = require("path");
const { PORT } = require("../config");

const router = Router();

router.get("/", (req, res) => {
  const cant = parseInt(req.query.cant) || 100000000;
  // const randoms = fork(path.resolve(__dirname, "../random.child.js"));
  // randoms.send({ cant: cant });
  // randoms.on("message", (objrandoms) => {
  //   console.log(objrandoms)
  //   // const randoms = objrandoms
  //   // res.render("notblocking", { objrandoms:JSON.stringify(objrandoms) , layout: false });
  //   res.json( {port:PORT, data:objrandoms});
  // });
  res.json( {port:PORT});
});

module.exports = router;
