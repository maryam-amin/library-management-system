const express = require("express");
const router = express.Router();

let borrowingProcessController = require('./borrowingProcess.controller');

router.post("/checkout", borrowingProcessController.checkoutBook);
router.post("/return", borrowingProcessController.returnBook);
router.get("/listborrowedbooks", borrowingProcessController.listBorrowedBooks);
router.get("/listoverdue", borrowingProcessController.listOverdueBooks);

module.exports = router;