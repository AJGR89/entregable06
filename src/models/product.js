const {Schema,model} = require("mongoose")

const productSchema = new Schema({
    title: String,
    price: String,
    thumbnail: String,

},{
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model("Product", productSchema);