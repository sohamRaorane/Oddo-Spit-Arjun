const prisma = require('../config/database');

const getDashboardStats = async (req, res) => {
    try {
        const totalItems = await prisma.stockItem.count();
        
        // Calculate total stock across all locations
        const totalStockAgg = await prisma.stockLevel.aggregate({
            _sum: { quantity: true },
        });
        const totalStock = totalStockAgg._sum.quantity || 0;
        
        const totalTransactions = await prisma.stockTransaction.count();

        // Calculate Total Value (Sum of quantity * price for each stock level)
        // Since we can't easily do this with a single aggregate query in Prisma without raw SQL or fetching all,
        // we'll fetch stock levels with item price. For large datasets, raw SQL is better.
        const stockLevels = await prisma.stockLevel.findMany({
            include: {
                stockItem: {
                    select: { price: true, minStock: true }
                }
            }
        });

        let totalValue = 0;
        let lowStock = 0;

        stockLevels.forEach(level => {
            totalValue += level.quantity * Number(level.stockItem.price);
            if (level.quantity <= level.stockItem.minStock) {
                lowStock++;
            }
        });

        // Mock data for "To Receive" and "To Deliver" as per Excalidraw
        // In a real app, these might be based on pending orders, but we'll use transaction counts for now
        const receipts = await prisma.stockTransaction.count({ where: { type: 'RECEIPT' } });
        const deliveries = await prisma.stockTransaction.count({ where: { type: 'DELIVERY' } });

        res.json({
            totalItems,
            totalStock,
            totalValue,
            lowStock,
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
