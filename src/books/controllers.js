const Book = require("./model");

// POST
const addBook = async (req, res) => {
  const newBook = await Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
  });

  res.send({message:"success", newBook});
};

// GET
const findAllBooks = async (req, res) => {
  const getBooks = await Book.findAll();

  res.send({message:"success",getBooks});
};

// GET
const findBookByAuthor = async (req, res) => {
  const getBook = await Book.findAll({ where: { author: req.params.author } });

  res.send({message:"success",getBook});
};

// PUT
const editTitle = async (req, res) => {
  const updateTitle = await Book.update(
    { title: req.body.newTitle },
    { where: { title: req.body.title } }
  );

  res.send({ message: "success",updateTitle });
};

// DELETE
const deleteByTitle = async (req, res) => {
  const deleteBook = await Book.destroy({ where: { title: req.params.title } });

  res.send({ message: "success",deleteBook });
};

//DELETE
const deleteAll = async (req, res) => {
  const deleteDB = await Book.destroyAll();

  res.send({message: "success", deleteDB});
};

module.exports = {
  addBook,
  findAllBooks,
  findBookByAuthor,
  editTitle,
  deleteByTitle,
  deleteAll,
};
