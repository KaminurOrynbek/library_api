const Book = require('../models/book');

// Borrow a book
// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
      const { bookId, readerId, dueDate } = req.body;
  
      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      if (book.isBorrowed) return res.status(400).json({ message: 'Book is already borrowed' });
  
      book.isBorrowed = true;
      book.borrowedBy = readerId;
      book.dueDate = dueDate;
      await book.save();
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };  

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (!book.isBorrowed) return res.status(400).json({ message: 'Book is not currently borrowed' });

        book.isBorrowed = false;
        book.borrowedBy = null;
        book.dueDate = null;
        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
