const Author = require("./model");
const Book = require("../books/model");

// POST
const addAuthor = async (req, res) => {
  const newAuthor = await Author.create({
    authorID: req.body.authorID,
    authorName: req.body.authorName,
  });
  res.send({ message: "success", newAuthor });
};

// GET
const getBooks = async (req, res) => {
  const searchAuthor = await Author.findAll({
    where: { authorName: req.params.author },
  });
  const findAuthorsBooks = await Book.findAll({
    where: { author: req.params.author },
  });
  res.send({
    message: "success",
    searchAuthor,
    findAuthorsBooks,
  });
};

module.exports = {
  addAuthor,
  getBooks,
};
