const express = require('express');
const categoriesControllers = require('../controllers/categoriesControllers');

const router = express.Router();

router.post('/', categoriesControllers.createCategories);
router.get('/', categoriesControllers.getAllCategories);
router.get('/:id', categoriesControllers.getDetailCategories);
router.put('/:id', categoriesControllers.updateCategories);
router.delete('/:id', categoriesControllers.deleteCategories);

module.exports = router;
