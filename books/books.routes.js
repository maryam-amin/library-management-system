const express = require("express");
const router = express.Router();

let booksController = require('./books.controller');

router.post("/create", booksController.createBook);
router.put("/update", booksController.updateBook);
router.get("/find", booksController.getBook);
router.get("/list", booksController.listAllBooks);
router.delete("/delete", booksController.deleteBook);

module.exports = router;