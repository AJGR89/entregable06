const MensajesMongo = require("./containers/mongo.container");

myPosts = new MensajesMongo();

module.exports = {
  myPosts,
};
