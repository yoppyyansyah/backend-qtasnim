const express = require('express');
const itemsControllers = require('../controllers/itemsControllers');

const router = express.Router();

router.post('/', itemsControllers.createItems);
router.get('/', itemsControllers.getAllItems);
router.get('/:id', itemsControllers.getDetailItems);
router.put('/:id', itemsControllers.updateItems);
router.delete('/:id', itemsControllers.deleteItems);

module.exports = router;
