const fs = require("fs");

class Mensaje {
  /* CONSTRUCTOR */
  /* CONSTRUCTOR */
  constructor(db) {
    this.db = db;
    this.table_name = "posts"
    this.init = false;
  }
  /* CREATE TABLE */
  dbInit(db) {
    db.schema
      .createTable(this.table_name, (table)=> {
        table.increments("id");
        table.string("email");
        table.string("msg");
        table.timestamp("create_at").defaultTo(this.db.fn.now());
        
      })
      .then(() => {
        this.init = true;
        console.log('error AQUII TRUE')
      })
      .catch((error) => {
        console.log("Constructor error: ",error)
        this.init = false;
      })
      // .finally(() => {
      //   db.destroy();
      // });

}

  /* SAVE ELEMENT */
  async save(msg) {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const addpost = await this.db(this.table_name).insert(msg);
      return addpost;
    } catch (error) {
      console.log("[save()]: could not save object");
      console.log(error)
      return null;
    }
    // finally{
    //   this.db.destroy();
    // }
  }

 /* GET ELEMENTS */
  async getAll() {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const addpost = await this.db.from(this.table_name).select('*');
      return addpost;
    } catch (error) {
      console.log("getAll error: ",error)
      return null;
    }
    // finally{
    //   this.db.destroy();
    // }
  }
}

 

module.exports = Mensaje;
