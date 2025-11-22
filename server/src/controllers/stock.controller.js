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
        const { stockItemId, type, quantity, locationId, reference, notes } = req.body;
        const userId = req.user.id; // From auth middleware

        // 1. Validate Item
        const item = await prisma.stockItem.findUnique({
            where: { id: stockItemId },
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // 2. Handle Stock Level Logic (Per Location)
        if (locationId) {
            const stockLevel = await prisma.stockLevel.findUnique({
                where: {
                    stockItemId_locationId: {
                        stockItemId: stockItemId,
                        locationId: locationId
                    }
                }
            });

            let currentQty = stockLevel ? stockLevel.quantity : 0;

            if (type === 'DELIVERY') {
                if (currentQty < quantity) {
                    return res.status(400).json({ message: 'Insufficient stock at this location' });
                }
                // Update or create stock level
                await prisma.stockLevel.upsert({
                    where: { stockItemId_locationId: { stockItemId, locationId } },
                    update: { quantity: { decrement: quantity } },
                    create: { stockItemId, locationId, quantity: -quantity } // Should not happen if check passed
                });
            } else if (type === 'RECEIPT') {
                await prisma.stockLevel.upsert({
                    where: { stockItemId_locationId: { stockItemId, locationId } },
                    update: { quantity: { increment: quantity } },
                    create: { stockItemId, locationId, quantity: quantity }
                });
            }
        }

        // 3. Create Transaction Record
        const transaction = await prisma.stockTransaction.create({
            data: {
                type,
                quantity,
                stockItemId,
                userId,
                locationId,
                reference,
                notes,
                status: 'COMPLETED'
            },
            include: {
                stockItem: true,
                user: true,
                location: true
            }
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error processing transaction' });
    }
};

// Get transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await prisma.stockTransaction.findMany({
            include: {
                stockItem: {
                    select: { name: true, sku: true },
                },
                user: {
                    select: { name: true, email: true }
                },
                location: {
                    select: { name: true, warehouse: { select: { name: true } } }
                }
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
