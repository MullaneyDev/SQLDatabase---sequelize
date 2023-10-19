const { DataTypes } = require("sequelize");

const connection = require("../db/connection");

const Author = connection.define("Author", {
  authorName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Author;
