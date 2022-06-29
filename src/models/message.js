const {Schema,model} = require("mongoose")

const msgSchema = new Schema({
    author:{
        id:String,
        nombre:String,
        apellido:String,
        edad:String,
        alias:String,
        avatar:String,
    },
    text:String,

},{
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model("Message", msgSchema);