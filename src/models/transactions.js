'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transactions = sequelize.define('Transactions', {
    itemsId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    active: {
        type: DataTypes.ENUM('ACTIVE', 'DELETE'),
        defaultValue: 'ACTIVE'
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
});

module.exports = Transactions;
