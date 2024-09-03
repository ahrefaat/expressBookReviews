const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Function to check if the user exists
const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
      return user.username === username;
    });
    return userswithsamename.length > 0;
  };

public_users.post("/register", (req,res) => {
  //Write your code here
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
/*public_users.get('/', function (req, res) {
  //Write your code here
  try{
    return res.send(JSON.stringify(books, null, 4));
  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});*/

// with axios
/*const axios = require('axios');
public_users.get('/', async function (req, res) {
    //Write your code here
    try {
        await axios.get('http://localhost:5000/books').then(
     (responseBooks)=>{
       return res.status(200).send(JSON.stringify(responseBooks.data,null , 4));
     })
        //let list_books = await axios.get('http://localhost:5000/books');
        //return res.status(200).json(list_books.data);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving book list' });
    }
  });*/

  // Promise
  public_users.get('/', function (req, res) {
    try {
        const prom = new Promise((resolve, reject) => {
            resolve(books);
          });
          prom.then((bookList) => {return res.send(JSON.stringify(bookList, null, 4));}); 
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving book list' });
    }
  });

// Get book details based on ISBN
/*public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  try{
    return res.send(books[req.params.isbn]);

  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
 });*/

 // Get book details based on ISBN - Promise
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    try {
        const prom = new Promise((resolve, reject) => {
            resolve(books[req.params.isbn]);
          });
          prom.then((book) => {return res.send(book);});
          
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving requested book' });
    }
   });

 
  
// Get book details based on author
/*public_users.get('/author/:author',function (req, res) {
  //Write your code here
  try{
    const author = req.params.author;
    const keys = Object.keys(books);
    let books_with_author = [];
    keys.forEach(key => {
        if(books[key]["author"] === author){
            books_with_author.push(books[key]);
        }
    });
    return res.send(books_with_author);
  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});*/

// Get book details based on author - promise
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  try{
    const prom = new Promise((resolve, reject) => {
        resolve(books);
      });
    prom.then((bookList) => {
        const author = req.params.author;
        const keys = Object.keys(bookList);
        let books_with_author = [];
        keys.forEach(key => {
            if(books[key]["author"] === author){
            books_with_author.push(bookList[key]);
            }
        });
    return res.send(books_with_author);
    }); 
  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get all books based on title
/*public_users.get('/title/:title',function (req, res) {
  //Write your code here
  try{
    const title = req.params.title;
    const keys = Object.keys(books);
    let books_with_title = [];
    keys.forEach(key => {
        if(books[key]["title"] === title){
            books_with_title.push(books[key]);
        }
    });
    return res.send(books_with_title);
  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});*/

// Get all books based on title - promise
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  try{
    const prom = new Promise((resolve, reject) => {
        resolve(books);
      });
    prom.then((bookList) => {
        const title = req.params.title;
        const keys = Object.keys(bookList);
        let books_with_title = [];
        keys.forEach(key => {
            if(books[key]["title"] === title){
                books_with_title.push(bookList[key]);
            }
        });
    return res.send(books_with_title);
    }); 
  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  try{
    const isbn = req.params.isbn;
    return res.send(books[isbn]["reviews"]);
  } catch(error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports.general = public_users;
