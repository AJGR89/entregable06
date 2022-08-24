const { MensajesMongo } = require("./containers/mongo.containers");
const { CustomError } = require("./containers/errors");

class MessagesFactoryDAO {
  static get(type) {
    switch (type) {
      case "FILE_SYSTEM":
        throw new CustomError(500, "FILE_SYSTEM not implemented");
        break;
      case "MONGODB":
        return new MensajesMongo();
        break;
      case "MY_SQL":
        throw new CustomError(500, "MY_SQL not implemented");
        break;

      default:
        return new MensajesMongo();
        break;
    }
  }
}

module.exports = { MessagesFactoryDAO };
