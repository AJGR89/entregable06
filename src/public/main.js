const socket = io();

/* PRODUCTOS */
socket.on("allproducts", (products) => {
  console.log("WS CONNECTION 0K", products);

  const tempalte = document.getElementById("table-template").innerHTML;
  // console.log(tempalte)
  // Compile the template
  var theTemplate = Handlebars.compile(tempalte);
  // Pass our data to the template
  var theCompiledHtml = theTemplate(products);
  // Add the compiled html to the page
  $(".tableproducts").html(theCompiledHtml);
});
function addproduct() {
  const product = {
    title: "",
    price: "",
    thumbnail: "",
  };

  product.title = document.getElementById("title").value;
  product.price = document.getElementById("price").value;
  product.thumbnail = document.getElementById("thumbnail").value;
  // console.log(product);
  if (product.title == "") {
    console.log(product.title);
    alert("Ingresa un producto");
    return;
  }
  if (product.price == "") {
    console.log(product.price);
    alert("Ingresa un precio");
    return;
  }
  if (product.thumbnail == "") {
    console.log(product.thumbnail);
    alert("Ingresa un enlace a imagen");
    return;
  }
  socket.emit("addproduct", product);
}
document.getElementById("btn-addproduct").onclick = addproduct;

/* POSTS */

const user = new normalizr.schema.Entity("users", {});
const post = new normalizr.schema.Entity(
  "posts",
  {
    author: user,
  },
  { idAttribute: "_id" }
);
const mensajes = new normalizr.schema.Entity("mensajes", {
  posts: [post],
});

socket.on("updateposts", (payload) => {
  console.log("WS updateposts", payload);
  // console.log('----------- OBJETO DESNORMALIZADO --------------');
  let denormalizeData = normalizr.denormalize(
    payload.result,
    mensajes,
    payload.entities
  );
 
  const template = document.getElementById("msg-template").innerHTML;
  // Compile the template
  var theTemplate = Handlebars.compile(template);

  const size1 = JSON.stringify(payload).length;
  const size2 = JSON.stringify(denormalizeData).length;
  console.log(size1, size2);
  let por = (size1 / size2 - 1) * 100;
  por = por.toFixed(2);
  document.getElementById(
    "titlemsgs"
  ).innerHTML = `Centro de mensajes (Compresión de mensajes: ${por}% )`;

  const myposts = denormalizeData.posts.map((el) => {
    return {
      email: el.author.id,
      created_at: el.createdAt,
      msg: el.text,
      avatar: el.author.avatar,
    };
  });
  console.log(myposts);

  // Pass our data to the template
  var theCompiledHtml = theTemplate({ myposts: myposts });

  // Add the compiled html to the page
  $(".tableposts").html(theCompiledHtml);
});

function sendpost() {
  console.log("EMIT");
  const post = {
    author: {
      id: String,
      nombre: String,
      apellido: String,
      edad: String,
      alias: String,
      avatar: String,
    },
    text: "",
  };
  post.author.id = document.getElementById("email").value;
  post.author.nombre = document.getElementById("name").value;
  post.author.apellido = document.getElementById("lastname").value;
  post.author.edad = document.getElementById("age").value;
  post.author.alias = document.getElementById("alias").value;
  post.author.avatar = document.getElementById("avatar").value;
  post.text = document.getElementById("msg").value;
  if (post.author.id == "") {
    console.log(post.email);
    alert("Ingresa un email");
    return;
  }
  if (post.text == "") {
    alert("Escribe un mensaje");
    return;
  }
  if (post.author.nombre == "") {
    alert("Ingresa tu nombre");
    return;
  }
  if (post.author.apellido == "") {
    alert("Ingresa tu apellido");
    return;
  }
  if (post.author.edad == "") {
    alert("Ingresa tu edad");
    return;
  }
  if (post.author.alias == "") {
    alert("Ingresa tu alias");
    return;
  }
  if (post.author.avatar == "") {
    alert("Ingresa tu avatar");
    return;
  }
  socket.emit("addpost", post);
}
document.getElementById("btn-send").onclick = sendpost;


// function sendlogin() {
//   console.log("sendlogin()");
//   const post = {
//     email: "",
//     pss:  "",
//   };
//   post.email = document.getElementById("emailLogin").value;
//   post.pss = document.getElementById("passuser").value;
//   if (post.email == "") {
//     console.log(post.email);
//     alert("Ingresa un email");
//     return;
//   }
//   if (post.pss == "") {
//     alert("Escribe un mensaje");
//     return;
//   }
// }
// document.getElementById("btn-login").onclick = sendlogin;
