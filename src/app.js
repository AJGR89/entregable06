const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const productsRoutes = require("./routes/products.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/****************************
 * CON HANDLEBARS
 *****************************/
 app.engine(
  "hbs",
  create({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialDir: path.resolve(__dirname, "./views/partials"),
  }).engine
);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api/productos", productsRoutes);
app.use("/api/", productsRoutes);

module.exports = {
  server,
  io

};
