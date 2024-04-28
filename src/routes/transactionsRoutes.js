const express = require('express');
const transactionsControllers = require('../controllers/transactionsControllers');

const router = express.Router();

router.post('/', transactionsControllers.createTransactions);
router.get('/', transactionsControllers.getAllTransactions);
router.get('/compare-data', transactionsControllers.getCompareData);

module.exports = router;
