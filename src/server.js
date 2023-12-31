require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Book = require("./books/model");
const Author = require("./authors/model");
const Genre = require("./genres/model");
const { Author_Genre, Author_Book, Genre_Book } = require("./throughModels");

const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");
const genreRouter = require("./genres/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/genres", genreRouter);

const syncTables = async () => {

  await Author.belongsToMany(Genre, { through: "Author_Genre" });
  await Author.belongsToMany(Book, {
    through: "Author_Book",
  });
  await Genre.belongsToMany(Author, { through: "Author_Genre" });
  await Genre.belongsToMany(Book, {
    through: "Genre_Book",
  });
  await Book.belongsToMany(Author, { through: "Author_Book" });
  await Book.belongsToMany(Genre, {
    through: "Genre_Book",
  });

  await Author.sync({ alter: true });
  await Genre.sync({ alter: true });
  await Book.sync({ alter: true });
  await Author_Genre.sync({ alter: true });
  await Author_Book.sync({ alter: true });
  await Genre_Book.sync({ alter: true });
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log("Server is listening");
});
