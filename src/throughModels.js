const { DataTypes } = require("sequelize");

const connection = require("./db/connection");

const Author_Genre = connection.define(
  "Author_Genre",
  {},
  { timestamps: false }
);
const Author_Book = connection.define("Author_Book", {}, { timestamps: false });
const Genre_Book = connection.define("Genre_Book", {}, { timestamps: false });

module.exports = { Author_Genre, Author_Book, Genre_Book };
