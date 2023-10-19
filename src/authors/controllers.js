const Author = require("./model");
const Book = require("../books/model");
const Genre = require("../genres/model")
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

    const requiredFields = ["authorName"];
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
    res.status(503).json({ message: error.message, error });
  }
};

// GET
const getBooks = async (req, res) => {
  try {
    const searchAuthor = await Author.findAll({
      where: { authorName: req.params.author },
      include: Book,
    });

    if (searchAuthor.length < 1) {
      res.status(404).json({ message: "No authors by that name" });
      return;
    }

    if (searchAuthor.length >= 1) {
      res.status(200).json({
        message: "success",
        searchAuthor,
      });
      return;
    }
  } catch (error) {
    res.status(503).json({ message: error.message, error });
  }
};

module.exports = {
  addAuthor,
  getBooks,
  getAuthors,
};
