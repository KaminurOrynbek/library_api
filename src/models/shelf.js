const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    location: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Shelf', shelfSchema);
