const { server, io } = require("./app");

const myContenedor = require("./database");

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
server.on("error", (error) => {
  console.log(error);
});

io.on("connection", async (socket) => {
  //init products table
  const products = await myContenedor.getAll();
  socket.emit("allproducts", { products: products });

  socket.on("addproduct", async (product) => {
    console.log("\n\n recibiendo producto ", product);
    const newProduct = await myContenedor.save(product);
    const products = await myContenedor.getAll();
    io.sockets.emit("allproducts", { products: products });
  });
});
