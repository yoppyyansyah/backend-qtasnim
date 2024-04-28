'use strict';
const { Op } = require('sequelize');
const Categories = require('../models/categories');
const { v4: uuidv4 } = require('uuid');

const create = async (data) => {
    try {
        data.id = uuidv4()
        data.createdBy = 'Admin'
        data.updatedBy = 'Admin'
        const newCategory = await Categories.create({...data});
        return newCategory;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal membuat kategori');
    }
}

const getAll = async (searchQuery) => {
    try {
        let query = {
            where : {
                active: 'ACTIVE'
            }
        };
        if (searchQuery) {
            query.where[Op.or] = [
                { name: { [Op.like]: `%${searchQuery}%` } }
            ];
        } 
        const categories = await Categories.findAll(query);
        return categories;
    } catch (error) {
        console.log(error);
        throw new Error('Gagal mendapatkan kategori');
    }
}


const getDetail = async (id) => {
    try {
        const categories = await Categories.findOne({ where: { id: id } });
        return categories
    } catch (error) {
        throw new Error(error);
    }

} 

const update = async (id, data) => {
    try {
        const [updatedRowsCount] = await Categories.update(
            { ...data },
            { where: { id } }
        );
        if (updatedRowsCount === 0) {
            throw new Error('Kategori tidak ditemukan');
        }
        return 'Kategori berhasil diperbarui';
    } catch (error) {
        throw new Error('Gagal memperbarui kategori');
    }
}


module.exports = {
    create,
    getAll,
    getDetail,
    update
};
