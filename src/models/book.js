const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  isbn: { type: String, unique: true, required: true },
  shelf: { type: mongoose.Schema.Types.ObjectId, ref: "Shelf" },
  isBorrowed: { type: Boolean, default: false },  
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader' },  
  dueDate: { type: Date, default: null }
});

module.exports = mongoose.model('Book', bookSchema);
