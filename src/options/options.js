const path = require('path')

const db_sqlite3 = require("knex")({
  client: "sqlite3",
  connection:{
    filename: path.resolve(__dirname,"../DB/ecommerce.sqlite"),
  },
  useNullAsDefault: true
});

const db_mysql = require("knex")({
  client: "mysql",
  version: "5.7",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
});

module.exports = {
  db_sqlite3,
  db_mysql
};
