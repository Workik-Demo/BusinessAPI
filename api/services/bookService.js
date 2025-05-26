const { v4: uuidv4 } = require('uuid');

// In-memory database
let books = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, inStock: true },
  { id: '2', title: '1984', author: 'George Orwell', year: 1949, inStock: true }
];

// Business logic layer
class BookService {
  // Get all books
  getAllBooks() {
    return books;
  }

  // Get book by ID
  getBookById(id) {
    const book = books.find(b => b.id === id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  // Add new book
  addBook(bookData) {
    const newBook = {
      id: uuidv4(),
      ...bookData
    };
    
    // Business rule: Ensure book has all required fields
    if (!newBook.title || !newBook.author) {
      throw new Error('Title and author are required fields');
    }
    
    books.push(newBook);
    return newBook;
  }

  // Update book
  updateBook(id, updatedData) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    
    // Business rule: Cannot update ID
    const { id: _, ...data } = updatedData;
    
    books[index] = { ...books[index], ...data };
    return books[index];
  }

  // Delete book
  deleteBook(id) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    
    const deletedBook = books[index];
    books = books.filter(b => b.id !== id);
    return deletedBook;
  }

  // Business logic: Search books by title or author
  searchBooks(query) {
    if (!query || query.trim() === '') {
      return [];
    }
    
    const searchTerm = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm)
    );
  }

  // Business logic: Get out-of-stock books
  getOutOfStockBooks() {
    return books.filter(book => !book.inStock);
  }

  // Business logic: Mark book as in/out of stock
  updateStockStatus(id, inStock) {
    const book = this.getBookById(id);
    book.inStock = inStock;
    return book;
  }
}

module.exports = new BookService();