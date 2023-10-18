const { Router } = require("express")
const genreRouter = Router()

const {addGenre, getBooks} = require("./controllers")

genreRouter.post ("/", addGenre)

genreRouter.get("/:genre", getBooks)

module.exports = genreRouter