const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const borrowController = require('../controllers/borrowController');

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);


router.post('/borrow', borrowController.borrowBook);  
router.put('/return/:bookId', borrowController.returnBook);  

module.exports = router;
