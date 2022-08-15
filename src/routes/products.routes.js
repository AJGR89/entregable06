const express = require("express");
const { Router } = express;
const {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");

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

//GEL ALL
router.get("/", getProducts);

//GET BY ID
router.get("/:id", getProductById);

//ADD PRODUCT
router.post("/", addProduct);

//UPDATE BY ID
router.put("/:id", updateProductById);

//DELET BY ID
router.delete("/:id", deleteProductById);

module.exports = router;
