const { ProductsMongo } = require("./containers/mongo.containers");
const { CustomError } = require("./containers/errors");

class ProductsFactoryDAO {
  static get(type) {
    switch (type) {
      case "FILE_SYSTEM":
        throw new CustomError(500, "FILE_SYSTEM not implemented");
        break;
      case "MONGODB":
        return new ProductsMongo();
        break;
      case "MY_SQL":
        throw new CustomError(500, "MY_SQL not implemented");
        break;

      default:
        return new ProductsMongo();
        break;
    }
  }
}

module.exports = { ProductsFactoryDAO };
