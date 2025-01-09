const express = require('express');
const router = express.Router();
const { getBooksOnShelf, addShelf, updateShelf } = require('../controllers/shelfController');

router.get('/:id', getBooksOnShelf);
router.post('/', addShelf);
router.put('/:id', updateShelf);

module.exports = router;
