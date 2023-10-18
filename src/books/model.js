const { DataTypes } = require("sequelize");

const connection = require("../db/connection");
// const Author = require("../authors/model");
// const Genre = require("../genres/model");

const Book = connection.define("Book", {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Book;
