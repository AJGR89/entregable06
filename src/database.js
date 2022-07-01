const {MensajesMongo,ProductsMongo} = require("./containers/mongo.container");

myPosts = new MensajesMongo();
myProducts = new ProductsMongo();

module.exports = {
  myPosts,
  myProducts,
};
