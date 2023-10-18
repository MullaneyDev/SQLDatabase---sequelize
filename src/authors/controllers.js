const Author = require("./model");
const Book = require("../books/model");
const { findMissingRequiredFields } = require("../utils/utils");

// POST
const addAuthor = async (req, res) => {
  try {
    const findAuthor = await Author.findAll({
      where: { authorName: req.body.authorName },
    });
    if (findAuthor.length >= 1) {
      res.status(409).json({ message: "Record already exists" });
      return;
    }

    const requiredFields = ["authorName", "authorID"];
    const missingFields = findMissingRequiredFields(requiredFields, req.body);

    if (missingFields.length >= 1) {
      res
        .status(409)
        .json({ message: `${missingFields} is missing from body` });
      return;
    }
    const newAuthor = await Author.create({
      authorID: req.body.authorID,
      authorName: req.body.authorName,
    });
    res.send({ message: "success", newAuthor });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error });
      return;
    }
    res.status(500).json({ message: error.message, error });
  }
};

//GET
const getAuthors = async (req, res) => {
  try {
    const getAuthorList = await Author.findAll();
    if (getAuthorList.length >= 1) {
      res.status(200).json({ message: "success", getAuthorList });
      return;
    }
    res.status(409).json({ message: "No records exist" });
  } catch (error) {
    res.stats(503).json({ message: error.message, error });
  }
};

// GET
const getBooks = async (req, res) => {
  try {
    const searchAuthor = await Author.findAll({
      where: { authorName: req.params.author },
    });
    const findAuthorsBooks = await Book.findAll({
      where: { author: req.params.author },
    });
    if (searchAuthor.length < 1) {
      res.status(404).json({ message: "No authors by that name" });
      return;
    }
    if (findAuthorsBooks.length < 1) {
      res.status(404).json({ message: `No books by ${req.params.author}` });
      return;
    }
    if (searchAuthor.length >= 1 && findAuthorsBooks.length >= 1) {
      res.status(200).json({
        message: "success",
        searchAuthor,
        findAuthorsBooks,
      });
      return;
    }
  } catch (error) {
    res.stats(503).json({ message: error.message, error });
  }
};

module.exports = {
  addAuthor,
  getBooks,
  getAuthors,
};
