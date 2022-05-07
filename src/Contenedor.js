class Contenedor {
  /* CONSTRUCTOR */
  constructor(db) {
    this.db = db;
    this.init = false;
  }
  /* CREATE TABLE */
  dbInit(db) {
      db.schema
        .createTable("products", (table)=> {
          table.increments("id");
          table.string("title");
          table.integer("price");
          table.string("thumbnail");
          
        })
        .then(() => {
          this.init = true;
          console.log('error AQUII TRUE')
        })
        .catch((error) => {
          this.init = false;
        })
        // .finally(() => {
        //   db.destroy();
        // });

  }

  /* SAVE ELEMENT */
  async save(product) {
    try {
      this.init = await this.db.schema.hasTable("products");
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const addproduct = await this.db("products").insert(product);
      return addproduct;
    } catch (error) {
      console.log("[save()]: could not save object", error);
      return null;
    } 
    // finally {
    //   this.db.destroy();
    // }
  }

  /* GET ELEMENT */
  async getById(id) {
    try {
      if (this.init == false) {
        await this.dbInit(this.db);
      }
      const element = await this.db("products").where({ id: id }).select("*");
      return element;
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   this.db.destroy();
    // }
  }

  /* GET ELEMENTS */
  async getAll() {
    try {
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const elements = await this.db.from("products").select("*");
      const result = Object.values(JSON.parse(JSON.stringify(elements)));
      // console.log(result)
      return elements;
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   this.db.destroy();
    // }
  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
      if (this.init == false) {
        await this.dbInit(this.db);
      }
      const element = await this.db("products").where({ id: id }).del();
      return element;
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   this.db.destroy();
    // }
  }

  /* DELETE ELEMENTS */
  async deleteAll() {
    try {
      if (this.init == false) {
        await this.dbInit(this.db);
      }
      const element = await this.db("products").del();
      return element;
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   this.db.destroy();
    // }
  }

  /* UPDATE ELEMENT */
  async updateById(id, product) {
    try {
      if (this.init == false) {
        await this.dbInit(this.db);
      }
      const element = await this.db("products")
        .where({ id: id })
        .update(product);
      return element;
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   this.db.destroy();
    // }
  }
}

module.exports = Contenedor;
