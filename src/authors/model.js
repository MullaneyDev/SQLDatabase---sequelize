const { DataTypes } = require("sequelize");

const connection = require("../db/connection");

const Author = connection.define("Author", {
  authorID: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Author;
