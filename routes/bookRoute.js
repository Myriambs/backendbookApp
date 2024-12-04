const express = require('express');
const bookRoute = express.Router();

const{addBook,lectureBook,updatedBook,removeBook,uniqueBook} = require('../controllers/bookControllers');
const Book = require('../model/BookModel')


//http://localhost:5000/books
bookRoute.post('/', addBook);
//http://localhost:5000/books
bookRoute.get('/',lectureBook );
//http://localhost:5000/books
  bookRoute.put('/:id',updatedBook)

//http://localhost:5000/books
bookRoute.delete('/:id',removeBook)

//http://localhost:5000/books
bookRoute.get('/getById/:id',uniqueBook)

// http://localhost:5000/books/search

bookRoute.get('/search', async (req, res) => {
  const { titre } = req.query;

  try {
    const books = await Book.find({ titre: new RegExp(titre, 'i') }); // Case-insensitive search
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error searching books' });
  }
});

module.exports = bookRoute;
