const fs = require("fs");

class Contenedor {
  /* CONSTRUCTOR */
  constructor(name) {
    this.nameFile = name;
    this._uriFile = `./src/files/${this.nameFile}`;
    this.uriID = "./src/files/lastid.txt";
    this._emptyFile;
    this._id;
    this._products = [];

    try {
      this._id = fs.readFileSync(this.uriID, "utf-8");
    } catch (error) {
      console.log(
        "***********************************************************************"
      );
      fs.writeFileSync(this.uriID, "1");
      this._id = 0;
    }

    try {
      const products = fs.readFileSync(this._uriFile, "utf-8");
      if (products == "") {
        this._products = [];
      } else {
        this._products = JSON.parse(products);
      }
      console.log("incosntructor, products: ", products);
    } catch (error) {
      console.log(error);
      this._products = [];
    }
  }

  /* SAVE ELEMENT */
  save(product) {
    try {
      this._id++;
      const newProduct = { _id: this._id, ...product };
      this._products.push(newProduct);
      fs.writeFileSync(this._uriFile, JSON.stringify(this._products));
      fs.writeFileSync(this.uriID, this._id.toString());
      return newProduct;
    } catch (error) {
      console.log("[save()]: could not save object");
      return null;
    }
  }

  /* GET ELEMENT */
  getById(id) {
    let element = null;
    this._products.forEach((el, index) => {
      if (el._id === id) {
        element = el;
      }
    });
    return element;
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

  /* DELETE ELEMENT */
  deleteById(id) {
    let index4delete = null;
    try {
      this._products.forEach((el, index) => {
        if (el._id === id) {
          index4delete = index;
        }
      });
      if (index4delete != null) {
        this._products.splice(index4delete, 1);
        fs.writeFileSync(this._uriFile, JSON.stringify(this._products));
        return true;
      }return false;
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE ELEMENTS */
  deleteAll() {
    try {
      const ready = fs.openSync(this._uriFile, "w");
      this._products = [];
    } catch (error) {
      console.log("[deleteAll()]: could not delete all elements");
    }
  }

  /* UPDATE ELEMENT */
  updateById(id,product){
    const Id = id;
    let index4update = null;
    try {
      this._products.forEach((el, index) => {
        if (el._id === Id) {
          index4update = index;
        }
      });
      if (index4update != null) {
        this._products[Id] = product;
        fs.writeFileSync(this._uriFile, JSON.stringify(this._products));
        return true;
      }return false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
