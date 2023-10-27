const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('librarymanagement', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {sequelize, DataTypes };