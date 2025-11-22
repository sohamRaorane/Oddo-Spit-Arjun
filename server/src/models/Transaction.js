const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const StockItem = require('./StockItem');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('RECEIPT', 'DELIVERY', 'ADJUSTMENT'),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Transaction.belongsTo(StockItem, { foreignKey: 'stockItemId' });
StockItem.hasMany(Transaction, { foreignKey: 'stockItemId' });

module.exports = Transaction;
