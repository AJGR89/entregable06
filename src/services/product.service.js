const { ProductsFactoryDAO } = require("../daos/products.factory");
const {SOURCE_DATA} = require("../config")

class ProductService {
  constructor() {
    this.productsDAO = ProductsFactoryDAO.get(SOURCE_DATA);
  }
  async save(product) {
    return await this.productsDAO.save(product);
  }
  async getAll() {
    return await this.productsDAO.getAll();
  }
  async getById(id) {
    return await this.productsDAO.getById(id);
  }
  async updateById(id, product) {
    return await this.productsDAO.updateById(id, product);
  }
  async deleteById(id) {
    return await this.productsDAO.deleteById(id);
  }
}

module.exports = { ProductService };
