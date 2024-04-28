const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('qtasnim', 'root', 'testingqtasnim', {
    host: '34.128.64.249',
    dialect: 'mysql'
});

module.exports = sequelize;
