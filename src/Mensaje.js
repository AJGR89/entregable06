const fs = require("fs");

class Mensaje {
  /* CONSTRUCTOR */
  constructor(name) {
    this.nameFile = name;
    this._uriFile = `./src/files/posts.txt`;
    this._emptyFile;
    this._id;
    this._posts = [];

    try {
      const posts = fs.readFileSync(this._uriFile, "utf-8");
      if (posts == "") {
        this._posts = [];
      } else {
        this._posts = JSON.parse(posts);
      }
      console.log("incosntructor, posts: ", posts);
    } catch (error) {
      console.log("ERROR EN CONSTRUCTOR\n\n\n\n",error);
      this._posts = [];
    }
  }

  /* SAVE ELEMENT */
  save(msg) {
    try {
        const rightNow =new Date();
      const mydate = `[${rightNow.getDate()}/${rightNow.getMonth()+1}/${rightNow.getFullYear()} ${rightNow.getHours()}:${rightNow.getMinutes()}:${rightNow.getSeconds()}]`  
      const newMsg = {...msg, create_at: mydate};
      this._posts.push(newMsg);
      fs.writeFileSync(this._uriFile, JSON.stringify(this._posts));
      return newMsg;
    } catch (error) {
      console.log("[save()]: could not save object");
      console.log(error)
      return null;
    }
  }

 /* GET ELEMENTS */
  getAll() {
    try {
      const content = fs.readFileSync(this._uriFile, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.log(error);
    }
  }
}

 

module.exports = Mensaje;
