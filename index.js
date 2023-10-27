const express = require('express');
const app = express();

const database = require("./config/database");

const Book = require("./models/Book");
const Borrower = require("./models/Borrower");
const BookBorrower = require("./models/BookBorrower");

//associations
Book.belongsToMany(Borrower, { through: BookBorrower })
Borrower.belongsToMany(Book, { through: BookBorrower })
BookBorrower.belongsTo(Book);
BookBorrower.belongsTo(Borrower);

const initApp = async () => {
    console.log("Testing database connection..");
    try {
        await database.sequelize.authenticate();
        console.log('Connection to database successful.');
        // Book.sync({ alter: true });
        // Borrower.sync({ alter: true });
        // BookBorrower.sync({ alter: true });

        app.use(express.json());
        app.use("/book", require("./books/books.routes"));
        app.use("/borrower", require("./borrowers/borrowers.routes"));
        app.use("/borrow", require("./borrowingProcess/borrowingProcess.routes"));

        app.listen('3000', () => {
            console.log('Server running on port 3000.');;
        })
    } catch (error) {
        console.log("error",error);
        console.log('Connection to database failed.');
    }
}

initApp(); 


