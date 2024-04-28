'use strict';
const itemsService = require('../services/itemsServices');


const createItems = async (req, res) => {
    try {
        const newItems = await itemsService.create(req.body);
        res.status(200).json({
            data : newItems,
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}


const getAllItems = async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const items = await itemsService.getAll(searchQuery);
        res.status(200).json({
            data : {
                items: items
            },
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}


const getDetailItems = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await itemsService.getDetail(id);
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

const updateItems = async (req, res) => {
    const { id } = req.params;
    const updatedBy = 'ADMIN';
    try {
        let payload = {
            ...req.body,
            updatedBy: updatedBy
        }
        const message = await itemsService.update(id, payload);
        res.status(200).json({
            message : message
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

const deleteItems = async (req, res) => {
    const { id } = req.params;
    const updatedBy = 'ADMIN';
    try {
        let payload = {
            active: 'DELETE',
            updatedBy: updatedBy
        }
        const message = await itemsService.update(id, payload);
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
    createItems,
    getAllItems,
    getDetailItems,
    updateItems,
    deleteItems
};
