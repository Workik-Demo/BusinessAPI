const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');
const { validateBook } = require('../middleware/validators');

// GET all books
router.get('/', (req, res) => {
  try {
    const books = bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET book by ID
router.get('/:id', (req, res) => {
  try {
    const book = bookService.getBookById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// POST new book
router.post('/', validateBook, (req, res) => {
  try {
    const newBook = bookService.addBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update book
router.put('/:id', validateBook, (req, res) => {
  try {
    const updatedBook = bookService.updateBook(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// DELETE book
router.delete('/:id', (req, res) => {
  try {
    const deletedBook = bookService.deleteBook(req.params.id);
    res.json(deletedBook);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// GET search books - business logic exposed as API endpoint
router.get('/search/query', (req, res) => {
  try {
    const query = req.query.q;
    const results = bookService.searchBooks(query);
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET out-of-stock books - business logic exposed as API endpoint
router.get('/stock/out', (req, res) => {
  try {
    const outOfStockBooks = bookService.getOutOfStockBooks();
    res.json(outOfStockBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update stock status - business logic exposed as API endpoint
router.patch('/:id/stock', (req, res) => {
  try {
    const { inStock } = req.body;
    if (typeof inStock !== 'boolean') {
      return res.status(400).json({ error: 'inStock must be a boolean value' });
    }
    
    const updatedBook = bookService.updateStockStatus(req.params.id, inStock);
    res.json(updatedBook);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;