const express = require('express');
const router = express.Router();
const {
    getStockItems,
    createStockItem,
    createTransaction,
    getTransactions,
} = require('../controllers/stock.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/items', authMiddleware, getStockItems);
router.post('/items', authMiddleware, createStockItem);
router.post('/transactions', authMiddleware, createTransaction);
router.get('/transactions', authMiddleware, getTransactions);

module.exports = router;
