const { Router } = require("express");
const authorRouter = Router();

const { addAuthor, getBooks } = require("./controllers");

authorRouter.post("/", addAuthor);

authorRouter.get("/:author", getBooks);

module.exports = authorRouter;
