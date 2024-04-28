'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Items = sequelize.define('Items', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriesId: {
        type: DataTypes.UUID,
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




module.exports = Items;
