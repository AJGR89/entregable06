const {MensajesMongo,ProductsMongo, UsersMongo} = require("./containers/mongo.container");

myPosts = new MensajesMongo();
myProducts = new ProductsMongo();
myUsers = new UsersMongo();

module.exports = {
  myPosts,
  myProducts,
};
