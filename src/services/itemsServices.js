'use strict';
const Items = require('../models/items');
const { v4: uuidv4 } = require('uuid');
const Categories = require('../models/categories');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

const create = async (data) => {
    try {

        data.id = uuidv4()
        data.createdBy = 'Admin'
        data.updatedBy = 'Admin'
        const newItem = await Items.create({...data});
        return newItem;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal membuat barang');
    }
}

const getAll = async (searchQuery) => {
    try {
       
        let whereClause = 'WHERE Items.active = :active';
        const replacements = { active: 'ACTIVE' };

        if (searchQuery) {
            whereClause += ' AND (Items.name LIKE :searchQuery)';
            replacements.searchQuery = `%${searchQuery}%`;
        }

        const query = `
            SELECT Items.id, Items.name, Items.categoriesId, Categories.name as "categoriesName"
            FROM Items
            LEFT JOIN Categories ON Items.categoriesId = Categories.id
            ${whereClause}
        `;

        const items = await sequelize.query(query, {
            replacements,
            type: QueryTypes.SELECT,
            model: Items, 
            mapToModel: true 
        });
       
        return items;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal mendapatkan barang');
    }
}


const getDetail = async (id) => {
    try {
        const items = await Items.findOne({ 
            where: { id: id },
            include: {
                model: Categories,
                as: 'category', 
                attributes: ['name', 'id'] 
            }
        });
        return items
    } catch (error) {
        throw new Error(error);
    }

} 

const update = async (id, data) => {
    try {
        const [updatedRowsCount] = await Items.update(
            { ...data },
            { where: { id } }
        );
        if (updatedRowsCount === 0) {
            throw new Error('Barang tidak ditemukan');
        }
        return 'Barang berhasil diperbarui';
    } catch (error) {
        throw new Error('Gagal memperbarui barang');
    }
}


module.exports = {
    create,
    getAll,
    getDetail,
    update
};
