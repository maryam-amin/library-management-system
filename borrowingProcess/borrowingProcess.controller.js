const Book = require('../models/Book');
const Borrower = require('../models/Borrower');
const BookBorrower = require('../models/BookBorrower');
const { Op } = require('sequelize');
const moment = require('moment');

const checkoutBook = async (req, res) => {
    const {name, email, isbn} = req.body;

    let date = moment();
    let dateFormat = date.format("YYYY-MM-DD");
    let dueDateFormat = date.add(3, 'days').format("YYYY-MM-DD");

    try {
        let book = await Book.findOne({ where: { isbn: isbn, checkedOut: 0 } })
    
        if(book)
        {
            let oldBorrower = await Borrower.findOne({ where: { email: email }});
        
            if(oldBorrower)
                await book.addBorrower(oldBorrower, { through: { checkoutDate: dateFormat, dueDate: dueDateFormat }})
            else
            {
                let newBorrower = await Borrower.create({ name: name, email: email, registeredDate: dateFormat });
                await book.addBorrower(newBorrower, { through: { checkoutDate: dateFormat, dueDate: dueDateFormat }})
            }
            book.checkedOut = 1;
            await book.save();
            return res.status(201).send({ message: 'Borrowing record created successfully' })
        }
        else 
            return res.status(400).send({ message: "Book taken!"});
        
        
    } catch (error) {
        return res.status(400).send({ message: "An error occurred while checking out book.", error: error});
    }

};

const returnBook = async (req, res) => {
    const {isbn} = req.body;
    let displayMessages = [];
    let today = moment();

    try {
        let book = await Book.findOne({ where: { isbn: isbn, checkedOut: 1 } });
    
        if(book)
        {
            let borrowingRecord = await BookBorrower.findOne({ where: { BookId: book.id }});
            let dueDate = moment.utc(moment(borrowingRecord.dueDate).format("YYYY-MM-DD"));
            
            book.checkedOut = 0;
            await book.save();
    
            borrowingRecord.checkinDate = today.format("YYYY-MM-DD");
            await borrowingRecord.save();
            displayMessages.push("Book returned successfully.")
    
    
            if(today.isAfter(dueDate))
            {
                displayMessages.push("You have passed your due date!")
            }
            return res.status(200).send(displayMessages);
        }
        else
        {
            return res.status(400).send({ message: "Book already returned"});
        }
        
    } catch (error) {
        return res.status(400).send({ message: "An error occurred while returning book.", error: error});
    }

};

const listBorrowedBooks = async (req, res) => {
    const {email} = req.body;

    try {
        let borrower = await Borrower.findOne({ where: { email: email }})
    
        let borrowedBooks = await BookBorrower.findAll({ 
            attributes: ['checkoutDate', 'dueDate'], 
            where: { BorrowerId : borrower.id, checkinDate: null }, 
            include: [{model: Book, attributes: ['title']}]
        })
        return res.status(200).send({ borrowedBooks: borrowedBooks })
        
    } catch (error) {
        return res.status(400).send({ message: "An error occurred while fetching books.", error: error});
    }
    
};

const listOverdueBooks = async (req, res) => {
    let today = moment().format("YYYY-MM-DD");

    try {
        let overdueBooks = await BookBorrower.findAll({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { checkinDate: null, dueDate: { [Op.lt]: today } },
            include: [
                { model: Book, attributes: ['title'] },
                { model: Borrower, attributes: ['name', 'email'] }
            ],
        })
        return res.status(200).send({ overdueBooks: overdueBooks });
        
    } catch (error) {
        return res.status(400).send({ message: "An error occurred while fetching books.", error: error});
    }
    
};

module.exports = { checkoutBook, returnBook, listBorrowedBooks, listOverdueBooks }