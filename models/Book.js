const { sequelize, DataTypes } = require("../config/database");

const Book = sequelize.define(
    'Book', 
    {
        isbn: {
            type: DataTypes.STRING,
            unique: true
        },
        author: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        availableQuantity: {
            type: DataTypes.INTEGER
        },
        shelfLoc: {
            type: DataTypes.STRING
        },
        checkedOut: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0
        },
});

module.exports = Book;
