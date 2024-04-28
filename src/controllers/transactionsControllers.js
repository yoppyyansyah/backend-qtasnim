'use strict';
const transactionsService = require('../services/transactionsServices');


const createTransactions = async (req, res) => {
    try {
        const newTransactions = await transactionsService.create(req.body);
        res.status(200).json({
            data : newTransactions,
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}


const getAllTransactions = async (req, res) => {
    const searchQuery = req.query.search;
    try {
        const transactions = await transactionsService.getAll(searchQuery);
        res.status(200).json({
            data : {
                transactions: transactions
            },
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

const getCompareData = async (req, res) => {
    try {
        const transactions = await transactionsService.compareData(req.query);
        res.status(200).json({
            data : {
                transactions: transactions
            },
            message : "success"
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}


module.exports = {
    createTransactions,
    getAllTransactions,
    getCompareData
};
