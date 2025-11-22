const prisma = require('../config/database');

// Get all stock items
const getStockItems = async (req, res) => {
    try {
        const items = await prisma.stockItem.findMany();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create stock item
const createStockItem = async (req, res) => {
    try {
        const { name, sku, description } = req.body;
        const newItem = await prisma.stockItem.create({
            data: { name, sku, description },
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create transaction (Receipt/Delivery)
const createTransaction = async (req, res) => {
    try {
        const { stockItemId, type, quantity } = req.body;
        const item = await prisma.stockItem.findUnique({
            where: { id: parseInt(stockItemId) },
        });

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
        await prisma.stockItem.update({
            where: { id: item.id },
            data: { quantity: newQuantity },
        });

        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                stockItemId: parseInt(stockItemId),
                type,
                quantity,
            },
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
        const transactions = await prisma.transaction.findMany({
            include: {
                stockItem: {
                    select: { name: true, sku: true },
                },
            },
            orderBy: { createdAt: 'desc' },
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
