const { Router } = require("express");
const authorRouter = Router();

const { addAuthor, getBooks } = require("./controllers");

authorRouter.post("/authors", addAuthor);

authorRouter.get("/authors/:author", getBooks);

module.exports = authorRouter;
