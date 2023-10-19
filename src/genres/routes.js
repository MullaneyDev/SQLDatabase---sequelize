const { Router } = require("express")
const genreRouter = Router()

const {addGenre, getBooks, getGenres} = require("./controllers")

genreRouter.post ("/", addGenre)

genreRouter.get ("/", getGenres)

genreRouter.get("/:genre", getBooks)

module.exports = genreRouter