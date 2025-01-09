const express = require('express');
const router = express.Router();
const { createReservation, cancelReservation, getReservations } = require('../controllers/reservationController');

router.post('/', createReservation);
router.delete('/:id', cancelReservation);
router.get('/', getReservations);

module.exports = router;
