const { sequelize, DataTypes } = require("../config/database");

const BookBorrower = sequelize.define(
    'BookBorrower', 
    {
        checkinDate: {
            type: DataTypes.DATE,
        },
        checkoutDate: {
            type: DataTypes.DATE,
        },
        dueDate: {
            type: DataTypes.DATE,
        },
});
module.exports = BookBorrower;