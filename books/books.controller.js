const Book = require('../models/Book');
const { Op } = require('sequelize');

const createBook = async (req, res) => {
    const {isbn, title, author, availableQuantity, shelfLoc, checkedOut} = req.body;

    try {
        const book = await Book.create({ isbn: isbn, title: title, author: author, availableQuantity: availableQuantity, shelfLoc: shelfLoc, checkedOut: checkedOut });
        return res.status(201).send({ message: "Book created successfully!", book: book });
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not add book.", error: error});
    }
};

const updateBook = async (req, res) => {
    const {isbn} = req.query;

    let updateFields = {...req.body};

    try {
        const book = await Book.update(updateFields, { where: { isbn: isbn } });
        return res.status(200).send({ message: "Book updated successfully!", numberOfBooksUpdated: book });
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not update book.", error: error })
    }
};

const getBook = async (req, res) => {
    let {isbn, title, author} = req.body;

    //empty string as fallback value to prevent it from becoming "undefined" which causes error
    isbn = isbn || "";
    title = title || "";
    author = author || "";

    try {
        let book = await Book.findOne({ where: { [Op.or]: { isbn: isbn, title: title, author: author }}});
        return res.status(200).send({ message: "Book retrieved successfully!", book: book });
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not retrieve book.", error: error })
    }
};

const listAllBooks = async (req, res) => {
    try {
        let books = await Book.findAll();
        return res.status(200).send({ message: "Books retrieved successfully!", books: books })
    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not retrieve books.", error: error })
    }
};

const deleteBook = async (req, res) => {
    const {isbn} = req.body;

    try {
        await Book.destroy({ where: { isbn: isbn }});
        return res.status(200).send({ message: "Book deleted successfully!" })

    } catch (error) {
        return res.status(400).send({ message: "An error occurred. Could not delete book.", error: error })
    }
};

module.exports = { createBook, updateBook, getBook, listAllBooks , deleteBook }