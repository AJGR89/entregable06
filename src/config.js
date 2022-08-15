const { path } = require("path");
const { config } = require("dotenv");
const parseargs = require("minimist");
const aws = require('aws-sdk');
const args = parseargs(process.argv.slice(2));
const cpus = require("os").cpus().length;
const countargs = Object.values(args).length - 1;


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

const PORT = process.env.PORT || 8080;
const MODE = args.mode || "FORK";
const SOUCE_DATA = process.env.SOURCE_DATA || "MONGODB"

console.log(`Mode: ${MODE} | Port: ${PORT} `);

const MONGODB_URI =
process.env.MONGODB_URI || "MONGODB_URI";
  "mongodb://devuser:devpassword@localhost:27017/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";

module.exports = {
  MONGODB_URI,
  PORT,
  MODE,
  info,
  cpus,
};
