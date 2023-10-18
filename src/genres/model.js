const { DataTypes } = require("sequelize");

const connection = require("../db/connection");

const Genre = connection.define("Genre", {
  genreID: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  genreName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Genre;
