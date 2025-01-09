const Book = require("../models/book");
const Shelf = require("../models/shelf");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found." });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the book." });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to add book.", message: err.message });
  }
};


// Update book information
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ error: "Book not found." });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to update book." });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found." });
    res.json({ message: "Book deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book." });
  }
};
