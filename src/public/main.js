const socket = io();

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
