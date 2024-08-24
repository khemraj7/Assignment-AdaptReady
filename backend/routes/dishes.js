const express = require('express');
const getDishes = require('../controller/dishesController');

const router = express.Router();

router.get('/', getDishes.getAllDishes);
router.get('/:id', getDishes.getDishById);
router.post('/suggest', getDishes.suggestDishes);

module.exports = router