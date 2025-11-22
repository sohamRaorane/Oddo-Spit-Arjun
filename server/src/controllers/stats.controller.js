const { StockItem, Transaction } = require('../models');

const getDashboardStats = async (req, res) => {
    try {
        const totalItems = await StockItem.count();
        const totalStock = await StockItem.sum('quantity') || 0;
        const totalTransactions = await Transaction.count();

        // Mock data for "To Receive" and "To Deliver" as per Excalidraw
        // In a real app, these might be based on pending orders, but we'll use transaction counts for now
        const receipts = await Transaction.count({ where: { type: 'RECEIPT' } });
        const deliveries = await Transaction.count({ where: { type: 'DELIVERY' } });

        res.json({
            totalItems,
            totalStock,
            totalTransactions,
            receipts,
            deliveries,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getDashboardStats };
