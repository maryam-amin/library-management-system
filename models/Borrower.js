const { sequelize, DataTypes } = require("../config/database");

const Borrower = sequelize.define(
    'Borrower', 
    {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        registeredDate: {
            type: DataTypes.DATE
        },

});

module.exports = Borrower;