const express = require("express");
const router = express.Router();

let borrowersController = require('./borrowers.controller');

router.post("/create", borrowersController.createBorrower);
router.put("/update", borrowersController.updateBorrower);
router.get("/list", borrowersController.listAllBorrowers);
router.delete("/delete", borrowersController.deleteBorrower);

module.exports = router;