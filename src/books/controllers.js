const Book = require("./model");

// POST
const addBook = async (req, res) => {
  const newBook = await Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
  });

  const successResponse = {
    message: "success",
    newBook: newBook,
  };

  res.send(successResponse);
};

// GET
const findAllBooks = async (req, res) => {
  const getBooks = await Book.findAll();

  const successResponse = {
    message: "success",
    getBooks: getBooks,
  };

  res.send(successResponse);
};

// GET
const findBookByAuthor = async (req, res) => {
  const getBook = await Book.findAll({ where: { author: req.params.author } });

  const successResponse = {
    message: "success",
    getBook: getBook,
  };

  res.send(successResponse);
};

// PUT
const editTitle = async (req, res) => {
  const updateTitle = await Book.update(
    { title: req.body.newTitle },
    { where: { title: req.body.title } }
  );

  res.send({ message: "success", updateTitle: updateTitle });
};

// DELETE
const deleteByTitle = async (req, res) => {
  const deleteBook = await Book.destroy({ where: { title: req.params.title } });

  res.send({ message: "success", deleteBook: deleteBook });
};

//DELETE
const deleteAll = async (req, res) => {
  const deleteDB = await Book.destroyAll();

  const successResponse = {
    message: "success",
    deleteDB: deleteDB,
  };

  res.send(successResponse);
};

module.exports = {
  addBook: addBook,
  findAllBooks: findAllBooks,
  findBookByAuthor: findBookByAuthor,
  editTitle: editTitle,
  deleteByTitle: deleteByTitle,
  deleteAll: deleteAll,
};
