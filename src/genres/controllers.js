const Genre = require("../genres/model");
const Book = require("../books/model");

// POST
const addGenre = async (req, res) => {
  const newGenre = await Genre.create({
    genreID: req.body.genreID,
    genreName: req.body.genreName,
  });
  res.send({ message: "success", newGenre: newGenre });
};

//GET
const getBooks = async (req, res) => {
  const searchGenre = await Genre.findAll({
    where: { genreName: req.params.genre },
  });
  const findGenreBooks = await Book.findAll({
    where: { genre: req.params.genre },
  });
  res.send({
    message: "success",
    searchGenre: searchGenre,
    findGenreBooks: findGenreBooks,
  });
};

module.exports = {
  addGenre: addGenre,
  getBooks: getBooks,
};
