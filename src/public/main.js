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
    title:"",
    price:"",
    thumbnail:""
  }
  
  product.title = document.getElementById("title").value
  product.price = document.getElementById("price").value
  product.thumbnail = document.getElementById("thumbnail").value

  console.log(product)
  socket.emit("addproduct",product);
}
document.getElementById('btn-addproduct').onclick = addproduct;

/* POSTS */

socket.on("updateposts",(myposts)=>{
  console.log("WS updateposts", myposts);

  const template = document.getElementById("msg-template").innerHTML;
  // console.log(tempalte)
  // Compile the template
  var theTemplate = Handlebars.compile(template);

  // Pass our data to the template
  var theCompiledHtml = theTemplate(myposts);

  // Add the compiled html to the page
  $(".tableposts").html(theCompiledHtml);

})


function sendpost() {
  const post = {
    email: "",
    msg: "",
  }
  post.email = document.getElementById("email").value
  post.msg = document.getElementById("msg").value
  if(post.email == ""){
    console.log(post.email)
    alert("Ingresa un email");
    return
  }
  if(post.msg == ""){
    alert("Escribe un mensaje");
    return
  }
  
  socket.emit("addpost",post);
}
document.getElementById('btn-send').onclick = sendpost;
