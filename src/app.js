const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const productsRoutes = require("./routes/products.routes");
const authRoutes = require('./routes/auth.routes');
const session = require('express-session')
const MongoStore = require('connect-mongo')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://devuser:devpassword@localhost:27017/sesiones?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    autoRemove : 'interval' , 
    autoRemoveInterval : 1,
    ttl: 10*60
  }),
  secret: 'jlYoA9lJy0',
  resave: false,
  saveUninitialized: false,
}))

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

// app.use(express.static(path.join(__dirname, "public")));

/* FUNCTIONS */


app.use("/api/productos", productsRoutes);
app.use("/api/", productsRoutes);
app.use("/", authRoutes);


module.exports = {
  server,
  io

};
