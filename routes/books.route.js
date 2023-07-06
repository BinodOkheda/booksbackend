const express = require("express")
const app = express();
const BookRouter = express.Router();
const {Book} = require("../models/book.model")


// Add Book API
BookRouter.post('/api/books', async (req, res) => {
    try {
      const { title, author, genre, description, price } = req.body;
      const newBook = new Book({ title, author, genre, description, price });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to add book' });
    }
  });
  
  // Retrieve Books API
BookRouter.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve books' });
    }
  });
  
  // Delete Book API
BookRouter.delete('/api/books/:id', async (req, res) => {
    try {
      const { _id } = req.params;
      await Book.findByIdAndDelete(_id);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete book' });
    }
});
  
// Filter Books API
BookRouter.get('/api/books/filter', async (req, res) => {
    try {
      const { genre } = req.query;
      const books = await Book.find({ genre });
      res.json(books);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Failed to filter books' });
    }
});

// Sort Books API
BookRouter.get('/api/books/sort', async (req, res) => {
    try {
      const { sort } = req.query;
      let sortOrder = 1;
      if (sort === 'desc') {
        sortOrder = -1;
      }
      const books = await Book.find().sort({ price: sortOrder });
      res.json(books);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to sort books' });
    }
});

module.exports = {BookRouter}