const { Router } = require("express");
const authorRouter = Router();

const { addAuthor, getBooks, getAuthors } = require("./controllers");

authorRouter.post("/", addAuthor);

authorRouter.get("/", getAuthors)

authorRouter.get("/:author", getBooks);

module.exports = authorRouter;
