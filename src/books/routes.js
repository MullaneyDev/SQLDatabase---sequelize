const { Router } = require("express");
const bookRouter = Router();

const {
  findAllBooks,
  findBookByAuthorID,
  addBook,
  deleteAll,
  deleteByTitle,
  editTitle,
  findBookByTitle,
} = require("./controllers");

bookRouter.post("/", addBook);

bookRouter.get("/", findAllBooks);

bookRouter.get("/:title", findBookByTitle)

bookRouter.get("/author/:authorID", findBookByAuthorID);

bookRouter.put("/", editTitle);

bookRouter.delete("/delete/:title", deleteByTitle);

bookRouter.delete("/deleteAll", deleteAll);

module.exports = bookRouter;
