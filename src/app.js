const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
// const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const myUsers = require("./daos/mongo.dao");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const forkRoutes = require("./routes/fork.routes");
const cluster = require("cluster");
const { MODE, PORT, cpus } = require("./config");
const {loggerRoutes,loggerNoRoutes} = require('./middlewares/loggers') 
const {RouterProducts} = require("./routes/products.routes");
const {RouterAuth} = require("./routes/auth.routes");
const { connect, mongoose } = require("mongoose");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const {MONGODB_URI} = require('./config')

const dbConnect = ()=>{
  if (mongoose.connection.readyState == 0) {
    const db = connect(MONGODB_URI);
    console.log("DB connected to MONGO");
  }
}
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerRoutes)

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      MONGODB_URI,
      autoRemove: "interval",
      autoRemoveInterval: 1,
      ttl: 10 * 60,
    }),
    secret: "jlYoA9lJy0",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

const routerProducts = new RouterProducts();
const routerAuth = new RouterAuth();

app.use("/api/productos", routerProducts.start());
// app.use("/api/", productsRoutes);
app.use("/randoms", forkRoutes);
app.use("/", routerAuth.start());
app.get("*", loggerNoRoutes,function (req, res) {
  res.status(404).send({
    status: "error",
    data: "404: Page not found",
  });
});

passport.use(
  "login",
  new LocalStrategy((username, password, callback) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return callback(err);
      }

      if (!user) {
        console.log("No se encontro usuario");
        return callback(null, false);
      }

      if (!validatePass(user, password)) {
        console.log("Invalid Password");
        return callback(null, false);
      }

      return callback(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      User.findOne({ username: username }, async (err, user) => {
        if (err) {
          console.log("Error al registrarse");
          return callback(err);
        }

        if (user) {
          console.log("El usuario ya existe");
          return callback(null, false);
        }

        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: username,
          password: createHash(password),
        };

        await User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error al registrarse");
            return callback(err);
          }

          console.log(userWithId);
          console.log("Registro de usuario satisfactoria");

          return callback(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id, callback);
});

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function validatePass(user, password) {
  return bcrypt.compareSync(password, user.password);
}
module.exports = {
  server,
  io,
  passport,
  app
};
