const Book = require("./model");
const {findMissingRequiredFields} = require("../utils/utils")

// POST
const addBook = async (req, res) => {
  try {
    const findBook = await Book.findAll({ where: { title: req.body.title } });
    if (findBook.length >= 1) {
      res.status(409).json({ message: "Record already exists" });
      return;
    }
    if (req.body === null) {
      res.status(409).json({ message: "Body is missing" });
      return;
    }

    const requiredFields = ["title", "author", "genre", "price"];
    const missingFields = findMissingRequiredFields(requiredFields, req.body);

    if (missingFields.length >= 1) {
      res
        .status(409)
        .json({ message: `${missingFields} is missing from body` });
      return;
    }

    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price,
    });

    res.status(201).json({ message: "success", newBook });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error });
      return;
    }
    res.status(500).json({ message: error.message, error });
  }
};

// GET
const findAllBooks = async (req, res) => {
  try {
    const getBooks = await Book.findAll();
    if (getBooks.length >= 1) {
      res.status(200).json({ message: "success", getBooks });
      return;
    }
    res.status(409).json({ message: "No records exist" });
  } catch (error) {
    res.stats(503).json({ message: error.message, error });
  }
};

// GET
const findBookByAuthor = async (req, res) => {
  try {
    const getBook = await Book.findAll({
      where: { author: req.params.author },
    });
    if (getBook.length >= 1) {
      res.status(200).json({ message: "success", getBook });
      return;
    }
    res
      .status(404)
      .json({ message: "No books by this author in the database" });
  } catch (error) {
    res.stats(503).json({ message: error.message, error });
  }
};

// PUT
const editTitle = async (req, res) => {
  try {
    if (req.body === null) {
      res.status(409).json({ message: "Body is missing" });
      return;
    }
    const requiredFields = ["title", "newTitle"];

    const missingFields = findMissingRequiredFields(requiredFields, req.body);

    if (missingFields.length >= 1) {
      res
        .status(409)
        .json({ message: `${missingFields} is missing from body` });
      return;
    }
    const updateTitle = await Book.update(
      { title: req.body.newTitle },
      { where: { title: req.body.title } }
    );

    res.send({ message: "success", updateTitle });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error });
      return;
    }
    res.status(500).json({ message: error.message, error });
  }
};

// DELETE
const deleteByTitle = async (req, res) => {
  const deleteBook = await Book.destroy({ where: { title: req.params.title } });

  res.send({ message: "success", deleteBook });
};

//DELETE
const deleteAll = async (req, res) => {
  const deleteDB = await Book.destroyAll();

  res.send({ message: "success", deleteDB });
};

module.exports = {
  addBook,
  findAllBooks,
  findBookByAuthor,
  editTitle,
  deleteByTitle,
  deleteAll,
};
