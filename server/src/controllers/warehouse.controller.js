const prisma = require('../config/database');

// --- Warehouses ---

const getWarehouses = async (req, res) => {
    try {
        const warehouses = await prisma.warehouse.findMany({
            include: {
                locations: true,
                _count: {
                    select: { locations: true }
                }
            }
        });
        res.json(warehouses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching warehouses' });
    }
};

const createWarehouse = async (req, res) => {
    try {
        const { name, code, address, capacity } = req.body;
        const warehouse = await prisma.warehouse.create({
            data: { name, code, address, capacity }
        });
        res.status(201).json(warehouse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating warehouse' });
    }
};

// --- Locations ---

const getLocations = async (req, res) => {
    try {
        const locations = await prisma.location.findMany({
            include: {
                warehouse: true
            }
        });
        res.json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching locations' });
    }
};

const createLocation = async (req, res) => {
    try {
        const { name, code, warehouseId } = req.body;
        const location = await prisma.location.create({
            data: { name, code, warehouseId }
        });
        res.status(201).json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating location' });
    }
};

// Get inventory for a specific warehouse
const getWarehouseInventory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find all stock levels for locations in this warehouse
        const stockLevels = await prisma.stockLevel.findMany({
            where: {
                location: {
                    warehouseId: id
                }
            },
            include: {
                stockItem: true,
                location: true
            }
        });

        // Aggregate data to show total qty per item in this warehouse
        // Or just return the list of stock levels
        res.json(stockLevels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching warehouse inventory' });
    }
};

module.exports = {
    getWarehouses,
    createWarehouse,
    getLocations,
    createLocation,
    getWarehouseInventory
};