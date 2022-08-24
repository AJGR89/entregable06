const { ProductService } = require("../services/product.service");
const { loggerE } = require("../middlewares/loggers");

class ProductsController {
  constructor() {
    this.myProducts = new ProductService();
  }
  getProducts = async (req, res) => {
    try {
      const products = await this.myProducts.getAll();
      res.render("products", { products: products });
    } catch (error) {
      res.status(404).json({ error: "productos no encontrados" });
      loggerE.error({ error: "productos no encontrados" });
    }
  };

  getProductById = async (req, res) => {
    try {
      // const id = parseInt(req.params.id);
      const id = req.params.id;
      const product = await this.myProducts.getById(id);
      // console.log(product);
      if (product == null) {
        res.status(404).json({ error: "producto no encontrado" });
        loggerE.error("producto no encontrado");
        return;
      } else {
        res.status(200).json(product);
        return;
      }
    } catch (error) {
      loggerE.error("producto no encontrado");
      res.status(404).json({ error: "producto no encontrado" });
    }
  };

  addProduct = async (req, res) => {
    try {
      const product = req.body;
      const newProduct = await this.myProducts.save(product);

      if (newProduct != null) {
        const allproducts = await this.myProducts.getAll();
        const products = JSON.parse(JSON.stringify(allproducts));
        //   socket.emit('allproducts',{products:products})
        res.status(200).redirect("/");
      } else {
        res.status(500).json({ error: "producto no creado" });
        loggerE.error({ error: "producto no creado" });
      }
    } catch (error) {
      loggerE.error({ error: "producto no creado" });
    }
  };

  updateProductById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = req.body;
      const updateProduct = this.myProducts.updateById(id, product);
      if (updateProduct) {
        res.status(200).json({ msg: `product0 ${id} actualizado` });
        return;
      }
      loggerE.error({ error: `producto ${id} no encontrado` });
      return res.status(500).json({ error: `producto ${id} no encontrado` });
    } catch (error) {
      res.status(500).json({ error: `producto ${id} no encontrado` });
      loggerE.error({ error: `producto ${id} no encontrado` });
    }
  };

  deleteProductById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleteProduct = await this.myProducts.deleteById(id);
      if (deleteProduct) {
        res.status(200).json({ msg: `producto ${id} eliminado` });
      } else {
        res.status(500).json({ msg: `producto ${id} no encontrado` });
        loggerE.error({ error: `producto ${id} no encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error: `producto ${id} no encontrado` });
      loggerE.error({ error: `producto ${id} no encontrado` });
    }
  };
}

module.exports = { ProductsController };
