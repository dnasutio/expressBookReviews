const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.authorization.username
  const user_review = req.body.review;
  const isbn = req.params.isbn;
  //console.log("Balls", username, user_review, isbn)
  books[isbn].reviews[username] = user_review;
  //console.log(books[isbn].reviews[username]);

  console.log(books[isbn])

  return res.status(200).json(`The review for the book with ISBN ${isbn} has been added/modified`);
});

// Delete a book review
regd_users.delete("/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (books[isbn] && books[isbn].reviews[username]) {
    // Delete the review with the username
    delete books[isbn].reviews[username];
    console.log(`Review for the ISBN ${isbn} posted by user ${username} deleted.`);
  } else {
    console.log(`Review for the ISBN ${isbn} posted by user ${username} not found.`);
  }

  return res.status(200).json(`Review for the ISBN ${isbn} posted by user ${username} deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
