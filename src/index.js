const { server, io } = require("./app");
const { myPosts, myProducts } = require("./database");
const { PORT } = require("./config");
const { schema, denormalize, normalize } = require("normalizr");
const util = require("util");

/* PRINT */
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

/* NORMALIZR */
const user = new schema.Entity("users", {});
const post = new schema.Entity(
  "posts",
  {
    author: user,
  },
  { idAttribute: "_id" }
);
const mensajes = new schema.Entity("mensajes", {
  posts: [post],
});

// /* SERVER */
server.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
server.on("error", (error) => {
  console.log(error);
});

/* WS */
io.on("connection", async (socket) => {
  //init products table
  const products = await myProducts.getAll();
  socket.emit("allproducts", { products: products });

  socket.on("addproduct", async (product) => {
    console.log("\n\n recibiendo producto ", product);
    const newProduct = await myProducts.save(product);
    const products = await myProducts.getAll();
    io.sockets.emit("allproducts", { products: products });
  });

  //init messages
  const myposts = await myPosts.getAll();
  const postss = { id: 1, posts: JSON.parse(JSON.stringify(myposts)) };
  const normalizedposts = normalize(postss, mensajes);
  // print(normalizedposts.entities);
  socket.emit("updateposts", normalizedposts);

  socket.on("addpost", async (newpost) => {
    console.log("\n\n recibiendo mensaje ", newpost);

    const addPost = await myPosts.save(newpost);
    const myposts = await myPosts.getAll();
    const postss = { id: 1, posts: JSON.parse(JSON.stringify(myposts)) };
    const normalizedposts = normalize(postss, mensajes);
    // print(normalizedposts)

    io.sockets.emit("updateposts", normalizedposts);
  });
});
