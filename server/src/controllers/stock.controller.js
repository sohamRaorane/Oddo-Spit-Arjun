const { StockItem, Transaction } = require('../models');

// Get all stock items
const getStockItems = async (req, res) => {
    try {
        const items = await StockItem.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create stock item
const createStockItem = async (req, res) => {
    try {
        const { name, sku, description } = req.body;
        const newItem = await StockItem.create({ name, sku, description });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create transaction (Receipt/Delivery)
const createTransaction = async (req, res) => {
    try {
        const { stockItemId, type, quantity } = req.body;
        const item = await StockItem.findByPk(stockItemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        let newQuantity = item.quantity;
        if (type === 'RECEIPT') {
            newQuantity += quantity;
        } else if (type === 'DELIVERY') {
            if (item.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }
            newQuantity -= quantity;
        }

        // Update stock quantity
        await item.update({ quantity: newQuantity });

        // Create transaction record
        const transaction = await Transaction.create({
            stockItemId,
            type,
            quantity,
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [{ model: StockItem, attributes: ['name', 'sku'] }],
            order: [['createdAt', 'DESC']],
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getStockItems,
    createStockItem,
    createTransaction,
    getTransactions,
};
