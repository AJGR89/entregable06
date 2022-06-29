const { server, io } = require("./app");
const { myPosts } = require("./database");
const { PORT } = require("./config");
const {schema,denormalize,normalize} = require('normalizr');
const util = require('util')

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const user = new schema.Entity('users',{});
const post = new schema.Entity('posts',{
  author:user,
},{ idAttribute: '_id' })
const mensajes = new schema.Entity("mensajes",{
  posts:[post]
});

server.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
server.on("error", (error) => {
  console.log(error);
});

io.on("connection", async (socket) => {
  //init products table
  const myposts = await myPosts.getAll();
  const postss = {id:1 ,posts: JSON.parse(JSON.stringify(myposts))}
  const normalizedposts = normalize(postss,mensajes)
  // print(normalizedposts.entities);
  socket.emit("updateposts", normalizedposts);

  socket.on("addpost", async (newpost) => {
    console.log("\n\n recibiendo mensaje ", newpost);

    const addPost = await myPosts.save(newpost);
    const myposts = await myPosts.getAll();
    const postss = {id:1 ,posts: JSON.parse(JSON.stringify(myposts))}
    const normalizedposts = normalize(postss,mensajes)
    // print(normalizedposts)

    io.sockets.emit("updateposts", normalizedposts);
  });
});
