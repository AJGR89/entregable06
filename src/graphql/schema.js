const { buildSchema } = require("graphql");
const { ProductService } = require("../services/product.service");

class ProductsRoutesGraphql {
  constructor() {
    this.myProducts = new ProductService();
    this.schema = buildSchema(`
    input ProductInput{
      title: String
      price: Int
      thumbnail: String
    },
    type Product {
      _id: String
      title: String
      price: Int
      thumbnail: String
      createdAt: String
      updatedAt: String
    },
    type Query {
        getProductById(id: String): Product
        getAllProducts: [Product]
    },
    type Mutation {
      createProduct(product: ProductInput): Product
      updateProductById(id: String, product: ProductInput): Product
      deleteProductById(id: String): Product
    }
  `);
  }
  createProduct = async (product) => {
    try {
      const _product = product.product 
      const newProduct = await this.myProducts.save(_product);
      return newProduct;
    } catch (error) {}
  };

  getProductById = async (id) => {
    try {
      const _id = id.id 
      const product = await this.myProducts.getById(_id);
      console.log(product)
      return product;
    } catch (error) {}
  };

  getAllProducts = async () => {
    try {
      const products = await this.myProducts.getAll();
      return products;
    } catch (error) {}
  };

  updateProductById = async ({id, product}) => {
    try {
      const {title,price,thumbnail} = product;
      const newProduct = {
        title:title,
        price:price,
        thumbnail:thumbnail
      }
      const updateProduct = await this.myProducts.updateById(id, newProduct);
      
      return await this.myProducts.getById(id);
    } catch (error) {}
  };
  deleteProductById = async (id) => {
    try {
      const _id = id.id 
      const product = await this.getProductById(id);
      const deleteProduct = await this.myProducts.deleteById(_id);
      return product;
    } catch (error) {}
  };
}

module.exports = {ProductsRoutesGraphql}

// Root resolver
// let root = {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProductById,
//   deleteProductById
// };
