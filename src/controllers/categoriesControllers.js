'use strict';
const categoriesService = require('../services/categoriesServices');


const createCategories = async (req, res) => {

    const {name} = req.body;

    try {
        let payload = {
            name : name,
            active: "ACTIVE",
            createdBy: 'ADMIN',
            updatedBy: 'ADMIN'
        }
        const newCategories = await categoriesService.create(payload);
        res.status(200).json({
            data : newCategories,
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}


const getAllCategories = async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const categories = await categoriesService.getAll(searchQuery);
        res.status(200).json({
            data : {
                categories: categories
            },
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}


const getDetailCategories = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await categoriesService.getDetail(id);
        res.status(200).json({
            data : car,
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

const updateCategories = async (req, res) => {
    const { id } = req.params;
    const updatedBy = 'ADMIN';
    try {
        let payload = {
            ...req.body,
            updatedBy: updatedBy
        }
        const message = await categoriesService.update(id, payload);
        res.status(200).json({
            message : message
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

const deleteCategories = async (req, res) => {
    const { id } = req.params;
    const updatedBy = 'ADMIN'
    try {
        let payload = {
            active: 'DELETE',
            updatedBy: updatedBy
        }
        const message = await categoriesService.update(id, payload);
        res.status(200).json({
            message : message
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

module.exports = {
    createCategories,
    getAllCategories,
    getDetailCategories,
    updateCategories,
    deleteCategories
};
