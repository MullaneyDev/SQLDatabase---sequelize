const { Router } = require("express")
const genreRouter = Router()

const {addGenre, getBooks} = require("./controllers")

genreRouter.post ("/genres", addGenre)

genreRouter.get("/genres/:genre", getBooks)

module.exports = genreRouter