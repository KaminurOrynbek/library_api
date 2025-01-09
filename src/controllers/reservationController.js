const Reservation = require('../models/reservation');
const Book = require('../models/book');

// Create a reservation
exports.createReservation = async (req, res) => {
    try {
        const { bookId, readerId, startDate, endDate } = req.body;
        const existingReservation = await Reservation.findOne({ book: bookId, endDate: { $gte: new Date() } });
        if (existingReservation) return res.status(400).json({ message: 'Book is already reserved for the given period' });

        const reservation = new Reservation({ book: bookId, reader: readerId, startDate, endDate });
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Cancel a reservation
exports.cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json({ message: 'Reservation canceled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all reservations
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('book reader');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
