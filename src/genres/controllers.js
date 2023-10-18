const Genre = require("../genres/model");
const Book = require("../books/model");
const { findMissingRequiredFields } = require("../utils/utils");

// POST
const addGenre = async (req, res) => {
  try {
    const findGenre = await Genre.findAll({
      where: { genreName: req.body.genreName },
    });
    if (findGenre.length >= 1) {
      res.status(409).json({ message: "Record already exists" });
      return;
    }
    if (req.body === null) {
      res.status(409).json({ message: "Body is missing" });
      return;
    }
    const requiredFields = ["genreName", "genreID"];
    const missingFields = findMissingRequiredFields(requiredFields, req.body);

    if (missingFields.length >= 1) {
      res
        .status(409)
        .json({ message: `${missingFields} is missing from body` });
      return;
    }
    const newGenre = await Genre.create({
      genreID: req.body.genreID,
      genreName: req.body.genreName,
    });
    res.send({ message: "success", newGenre });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error });
      return;
    }
    res.status(500).json({ message: error.message, error });
  }
};
//GET
const getGenres = async (req, res) => {
  try {
    const getGenreList = await Genre.findAll();
    if (getGenreList.length >= 1) {
      res.status(200).json({ message: "success", getGenreList });
      return;
    }
    res.status(409).json({ message: "No records exist" });
  } catch (error) {
    res.stats(503).json({ message: error.message, error });
  }
};
//GET
const getBooks = async (req, res) => {
  try {
    const searchGenre = await Genre.findAll({
      where: { genreName: req.params.genre },
    });
    const findGenresBooks = await Book.findAll({
      where: { genre: req.params.genre },
    });
    if (searchGenre.length < 1) {
      res.status(404).json({ message: "No genres by that name" });
      return;
    }
    if (findGenresBooks.length < 1) {
      res
        .status(404)
        .json({ message: `No books in ${req.params.genre} genre` });
      return;
    }
    if (searchGenre.length >= 1 && findGenresBooks.length >= 1) {
      res.status(200).json({
        message: "success",
        searchGenre,
        findGenresBooks,
      });
      return;
    }
  } catch (error) {
    res.stats(503).json({ message: error.message, error });
  }
};

module.exports = {
  addGenre,
  getGenres,
  getBooks,
};
