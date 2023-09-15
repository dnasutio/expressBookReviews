const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const nice_books = JSON.stringify(books, null, 2);
  return res.status(300).send(nice_books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const nice_book = JSON.stringify(books[isbn], null, 2);
  return res.status(300).send(nice_book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let books_by_author = [];
  for (let bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      let book = books[bookId];
      if (book.author === author) {
        books_by_author.push(book);
      }
    }
  }

  const nice_books_by_author = JSON.stringify(books_by_author, null, 2);

  return res.status(300).send(nice_books_by_author);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let books_with_title = [];
  for (let bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      let book = books[bookId];
      if (book.title === title) {
        books_with_title.push(book);
      }
    }
  }

  const nice_books_with_title = JSON.stringify(books_with_title, null, 2);

  return res.status(300).send(nice_books_with_title);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const review = books[isbn].review;

  return res.status(300).json({ review });
});

module.exports.general = public_users;
