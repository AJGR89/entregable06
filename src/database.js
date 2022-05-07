const Contenedor = require("./Contenedor");
const Mensaje = require("./Mensaje");
const { db_mysql,db_sqlite3 } = require("./options/options");

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
const msg1 = {
  email: "a@a",
  msg: "hola mundo"
}
const msg2 = {
  email: "b@b",
  msg: "hola mundo to"
}

myContenedor = new Contenedor(db_mysql);
myPosts = new Mensaje(db_sqlite3);


module.exports = {
  myContenedor,
  myPosts,
};
