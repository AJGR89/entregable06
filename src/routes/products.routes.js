const express = require("express");
const { Router } = express;
const { ProductsController } = require("../controllers/products.controller");

let id = 0;

const router = Router();

//GEL TEST
router.get("/productos-test", (req, res) => {
  let products = [];
  for (let i = 0; i < 5; i++) {
    products.push({
      _id: id,
      title: `tittle ${i}`,
      price: Math.floor(Math.random() * 10000),
      thumbnail: `thumbnail${i}`,
    });
    id++;
  }
  // res.status(200).json({response:response})
  res.status(200).render("test-products", { products: products });
});

class RouterProducts {
  constructor() {
    this.productsController = new ProductsController();
  }
  start() {
    router.get("/", this.productsController.getProducts); //GEL ALL
    router.get("/:id", this.productsController.getProductById); //GET BY ID
    router.post("/", this.productsController.addProduct); //ADD PRODUCT
    router.put("/:id", this.productsController.updateProductById); //UPDATE BY ID
    router.delete("/:id", this.productsController.deleteProductById); //DELET BY ID

    return router;
  }
}

module.exports = { RouterProducts };
