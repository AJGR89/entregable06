const { path } = require("path");
const { config } = require("dotenv");
const parseargs = require("minimist");
const aws = require('aws-sdk');
// const options = {alias:{p:'PORT'}}
// const args = parseargs(process.argv.slice(2),options)
const args = parseargs(process.argv.slice(2));
const cpus = require("os").cpus().length;

// console.log(process.argv)
// console.log("MINIMIST", args);
// console.log("MINIMIST", args.p);
// console.log("MINIMIST", Object.values(args));
const countargs = Object.values(args).length - 1;
// console.log("PROCESS", process.pid);
// console.log("PROCESS", process.platform);
// console.log("PROCESS", process.version);
// console.log("PROCESS", process.memoryUsage());

const info = {
  countargs: countargs,
  pid: process.pid,
  platform: process.platform,
  version: process.version,
  mem: process.memoryUsage().rss,
  path: process.cwd(),
  execpath: process.execPath,
  cpus:cpus
};


config();


// console.log(`Moongo: ${process.env.MONGODB_URI} | Port: ${process.env.PORT} `);


const PORT = process.env.PORT || 8080;
const MODE = args.mode || "FORK"

console.log(`Mode: ${MODE} | Port: ${PORT} `);

const MONGODB_URI =
process.env.MONGODB_URI ||
  "mongodb://devuser:devpassword@localhost:27017/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";

module.exports = {
  MONGODB_URI,
  PORT,
  MODE,
  info,
  cpus,
};
