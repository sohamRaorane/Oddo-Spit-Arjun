const prisma = require('../config/database');

const getDashboardStats = async (req, res) => {
    try {
        const totalItems = await prisma.stockItem.count();
        const totalStockAgg = await prisma.stockItem.aggregate({
            _sum: { quantity: true },
        });
        const totalStock = totalStockAgg._sum.quantity || 0;
        const totalTransactions = await prisma.transaction.count();

        // Mock data for "To Receive" and "To Deliver" as per Excalidraw
        // In a real app, these might be based on pending orders, but we'll use transaction counts for now
        const receipts = await prisma.transaction.count({ where: { type: 'RECEIPT' } });
        const deliveries = await prisma.transaction.count({ where: { type: 'DELIVERY' } });

        res.json({
            totalItems,
            totalStock,
            totalTransactions,
            receipts,
            deliveries,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getDashboardStats };
