# library-management-system
This is a simple library management system project implemented using using Node.js and Sequelize (MySQL).
In order to successfully run this project, you'll need Node.js and MySQL to be installed on your system. To be able to visualize the database and the tables, it is recommended to install MySQL Workbench.
The packages used in this project are:
express, moment, mysql2, sequelize, sqlite3, moment.

The project implements the concept of a library where there are books, borrowers, and a borrowing system. 

A librarian can register a book, update its details, get a list of all books in the library, delete a book, and search for the book by title, author name, or the ISBN. The librarian can also register a new user who wants to borrow a book, update the user's details, get a list of all borrowers, and delete a borrower's entry. They can also get a list of all the books that are overdue.

A borrower can borrow a book, return it, and check all of the borrowed books they currently have.

