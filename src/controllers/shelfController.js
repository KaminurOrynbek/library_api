const Shelf = require('../models/shelf');

// Get all books on a shelf
exports.getBooksOnShelf = async (req, res) => {
    try {
        const { id } = req.params;
        const shelf = await Shelf.findById(id).populate('books');
        if (!shelf) return res.status(404).json({ message: 'Shelf not found' });
        res.status(200).json(shelf);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add a new shelf
exports.addShelf = async (req, res) => {
    try {
        const { number, location } = req.body;
        const newShelf = new Shelf({ number, location });
        const savedShelf = await newShelf.save();
        res.status(201).json(savedShelf);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update shelf information
exports.updateShelf = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShelf = await Shelf.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedShelf) return res.status(404).json({ message: 'Shelf not found' });
        res.status(200).json(updatedShelf);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
