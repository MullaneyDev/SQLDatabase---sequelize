const { Router } = require("express");
const bookRouter = Router();

const {
  findAllBooks,
  findBookByAuthor,
  addBook,
  deleteAll,
  deleteByTitle,
  editTitle,
} = require("./controllers");

bookRouter.post("/books", addBook);

bookRouter.get("/books", findAllBooks);

bookRouter.get("/books/:author", findBookByAuthor);

bookRouter.put("/books", editTitle);

bookRouter.delete("/books/delete/:title", deleteByTitle);

bookRouter.delete("/books/deleteAll", deleteAll);

module.exports = bookRouter;
