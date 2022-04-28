const Contenedor = require("./Contenedor");

const product1 = {
  title: "Taladro",
  price: 2500,
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_896351-MLA40518149904_012020-O.webp",
};

const product2 = {
  title: "Esmeril Angular",
  price: 4500,
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_764739-MLA46544980918_062021-O.webp",
};
const product3 = {
  title: "Sensitiva",
  price: 4500,
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_919851-MLA48051950156_102021-O.webp",
};

const myContenedor = new Contenedor("productos.txt");
// myContenedor.save(product1);
// myContenedor.save(product2);
// myContenedor.save(product3);

module.exports = myContenedor;
