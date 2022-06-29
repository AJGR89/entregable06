const {path} = require("path");
const { config } =require("dotenv");

config();

const PORT = process.env.PORT || 3001;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://devuser:devpassword@localhost:27017/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";


  module.exports = {
    MONGODB_URI,
    PORT,
  }

