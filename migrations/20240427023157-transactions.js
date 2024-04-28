'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Transactions', {
            id: {
              allowNull: false,
              type: Sequelize.UUID,
              defaultValue: uuidv4(),
              primaryKey: true
            },
            itemsId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            type: {
              type: Sequelize.ENUM('IN', 'OUT'),
              allowNull: false
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            qty: {
              type: Sequelize.INTEGER,
              allowNull: false
            },
            transactionDate: {
              type: Sequelize.DATE,
              allowNull: false
            },
            active: {
                type: Sequelize.ENUM('ACTIVE', 'DELETE'),
                defaultValue: 'ACTIVE'
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedBy: {
                type: Sequelize.UUID,
                allowNull: false
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Transactions');
    }
};
