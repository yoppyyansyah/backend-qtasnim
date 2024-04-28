'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUID,
                type: Sequelize.UUID,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Categories');
    }
};
