const { Router } = require("express");
const bookRouter = Router();

const {
  findAllBooks,
  addBook,
  deleteAll,
  deleteByTitle,
  editTitle,
  findBookByTitle,
} = require("./controllers");

bookRouter.post("/", addBook);

bookRouter.get("/", findAllBooks);

bookRouter.get("/:title", findBookByTitle)


bookRouter.put("/", editTitle);

bookRouter.delete("/delete/:title", deleteByTitle);

bookRouter.delete("/deleteAll", deleteAll);

module.exports = bookRouter;
