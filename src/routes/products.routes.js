const express = require("express");
const { Router } = express;
const { faker } = require("@faker-js/faker");
const { myProducts } = require("../database");
faker.locale = "es";
const { commerce, image, random } = faker;
let id = 0;

const router = Router();

//GEL TEST
router.get("/productos-test", (req, res) => {
  let products = [];
  for (let i = 0; i < 5; i++) {
    products.push({
      _id: id,
      title: commerce.product(),
      price: random.numeric(6, { bannedDigits: ["0"] }),
      thumbnail: image.imageUrl(),
    });
    id++;
  }
  // res.status(200).json({response:response})
  res.status(200).render("test-products", { products: products });
});

//GEL ALL
router.get("/", async (req, res) => {
  try {
    const products = await myProducts.getAll();
    res.render("products", { products: products });
  } catch (error) {
    res.status(404).json({ error: "productos no encontrados" });
  }
});

//GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await myProducts.getById(id);
    console.log(product);
    if (product == null) {
      res.status(404).json({ error: "producto no encontrado" });
      return;
    } else {
      res.status(200).json(product);
      return;
    }
  } catch (error) {
    res.status(404).json({ error: "producto no encontrado" });
  }
});

//ADD PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await myProducts.save(product);

    if (newProduct != null) {
      const allproducts = await myProducts.getAll();
      const products = JSON.parse(JSON.stringify(allproducts));
      //   socket.emit('allproducts',{products:products})
      res.status(200).redirect('/');
    } else {
      res.status(500).json({ error: "producto no creado" });
    }
  } catch (error) {}
});

//UPDATE BY ID
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = req.body;
    const updateProduct = myProducts.updateById(id, product);
    if (updateProduct) {
      res.status(200).json({ msg: `product0 ${id} actualizado` });
      return;
    }
    return res.status(500).json({ error: `producto ${id} no encontrado` });
  } catch (error) {
    res.status(500).json({ error: `producto ${id} no encontrado` });
  }
});

//DELET BY ID
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteProduct = await myProducts.deleteById(id);
    if (deleteProduct) {
      res.status(200).json({ msg: `producto ${id} eliminado` });
    } else {
      res.status(500).json({ msg: `producto ${id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: `producto ${id} no encontrado` });
  }
});

module.exports = router;
