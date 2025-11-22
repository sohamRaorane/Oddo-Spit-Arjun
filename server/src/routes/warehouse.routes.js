const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Warehouses
router.get('/', authMiddleware, warehouseController.getWarehouses);
router.post('/', authMiddleware, warehouseController.createWarehouse);
router.get('/:id/inventory', authMiddleware, warehouseController.getWarehouseInventory);

// Locations
router.get('/locations', authMiddleware, warehouseController.getLocations);
router.post('/locations', authMiddleware, warehouseController.createLocation);

module.exports = router;