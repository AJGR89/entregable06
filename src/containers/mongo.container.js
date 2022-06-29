const { connect, mongoose } = require("mongoose");
const { MONGODB_URI } = require("../config");
const Message = require("../models/message");

// CLASS PRODUCTS MONGO
class MensajesMongo {
  /* CONSTRUCTOR */
  constructor() {
    try {
      if (mongoose.connection.readyState == 0) {
        const db = connect(MONGODB_URI);
        console.log("DB connected to MONGO");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* SAVE ELEMENT */
  async save(message) {
    try {
      const newMessage = await Message.create(message);
      return newMessage;
    } catch (error) {
      console.log("[save()]: could not save object  ", error);
      return null;
    }
  }

  /* GET ELEMENT */
  async getById(id) {
    try {
      const message = await Message.findById(id);
      return message;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /* GET ELEMENTS */
  async getAll() {
    try {
      const messages = await Message.find({});
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
      const message = await Message.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* DELETE ELEMENTS */
  async deleteAll() {
    try {
      const message = await Message.deleteMany({});
    } catch (error) {
      console.log("[deleteAll()]: could not delete all elements");
    }
  }

}

module.exports = MensajesMongo;
