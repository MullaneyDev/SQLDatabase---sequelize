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

bookRouter.post("/", addBook);

bookRouter.get("/", findAllBooks);

bookRouter.get("/:author", findBookByAuthor);

bookRouter.put("", editTitle);

bookRouter.delete("/delete/:title", deleteByTitle);

bookRouter.delete("/deleteAll", deleteAll);

module.exports = bookRouter;
