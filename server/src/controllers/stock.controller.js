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
        const { name, sku, description, price, minStock } = req.body;
        const newItem = await prisma.stockItem.create({
            data: { 
                name, 
                sku, 
                description,
                price: price || 0.0,
                minStock: minStock || 10
            },
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create transaction (Receipt/Delivery/Transfer)
const createTransaction = async (req, res) => {
    try {
        const { stockItemId, type, quantity, locationId, toLocationId, reference, notes } = req.body;
        const userId = req.user.id; // From auth middleware

        // 1. Validate Item
        const item = await prisma.stockItem.findUnique({
            where: { id: stockItemId },
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // 2. Handle Stock Level Logic
        if (type === 'TRANSFER') {
            if (!locationId || !toLocationId) {
                return res.status(400).json({ message: 'Both source and destination locations are required for transfer' });
            }
            if (locationId === toLocationId) {
                return res.status(400).json({ message: 'Source and destination locations must be different' });
            }

            // Check source stock
            const sourceStock = await prisma.stockLevel.findUnique({
                where: { stockItemId_locationId: { stockItemId, locationId } }
            });

            if (!sourceStock || sourceStock.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock at source location' });
            }

            // Execute Transfer (Atomic Transaction ideally, but sequential here for simplicity)
            // Decrement Source
            await prisma.stockLevel.update({
                where: { stockItemId_locationId: { stockItemId, locationId } },
                data: { quantity: { decrement: quantity } }
            });

            // Increment Destination
            await prisma.stockLevel.upsert({
                where: { stockItemId_locationId: { stockItemId, locationId: toLocationId } },
                update: { quantity: { increment: quantity } },
                create: { stockItemId, locationId: toLocationId, quantity: quantity }
            });

        } else if (locationId) {
            // Existing logic for RECEIPT/DELIVERY
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
                toLocationId: type === 'TRANSFER' ? toLocationId : undefined,
                reference,
                notes,
                status: 'COMPLETED'
            },
            include: {
                stockItem: true,
                user: true,
                location: true,
                toLocation: true
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
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const transactions = await prisma.stockTransaction.findMany({
            take: limit,
            include: {
                stockItem: true,
                user: true,
                location: true
            },
            orderBy: {
                id: 'desc' // Assuming ID is sortable, or use createdAt if available (schema didn't show createdAt for Transaction but usually it has one)
            }
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await prisma.stockTransaction.findUnique({
            where: { id },
            include: {
                stockItem: true,
                user: true,
                location: true
            }
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getStockItems,
    createStockItem,
    createTransaction,
    getTransactions,
    getTransactionById
};
