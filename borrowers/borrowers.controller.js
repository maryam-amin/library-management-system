const Borrower = require('../models/Borrower');
const moment = require('moment');

const createBorrower = async (req, res) => {
    let date = moment();
    let dateFormat = date.format("YYYY-MM-DD");

    const {name, email} = req.body;
    try {
        let borrower = await Borrower.create({ name: name, email: email, registeredDate: dateFormat })
        return res.status(201).send({ message: "Borrower created successfully!", borrower: borrower })
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not add borrower.", error: error})
    }
};

const updateBorrower = async (req, res) => {
    const { email} = req.query;

    let updateFields = {...req.body};

    try {
        let borrower = await Borrower.update(updateFields, { where: { email: email } })
        return res.status(201).send({ message: "Borrower updated successfully!", borrower: borrower })
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not update borrower.", error: error})
    }
};

const listAllBorrowers = async (req, res) => {
    try {
        let borrowers = await Borrower.findAll();
        return res.status(200).send({ message: "Borrowers retrieved successfully!", borrowers: borrowers })
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not retrieve borrowers.", error: error })
    }
};

const deleteBorrower = async (req, res) => {
    const {email} = req.body;

    try {
        await Borrower.destroy({ where: { email: email }});
        return res.status(200).send({ message: "Borrower deleted successfully!" })

    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not delete borrower.", error: error })
    }
}

module.exports = { createBorrower, updateBorrower, listAllBorrowers , deleteBorrower }