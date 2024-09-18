// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('../models/product');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    // customerId: { type: DataTypes.STRING, allowNull: false },
    // paymentIntentId: { type: DataTypes.STRING, allowNull: false },
    // products: { type: DataTypes.JSON, allowNull: false }, // Use JSON data type for products
    total: { type: DataTypes.FLOAT, allowNull: false },
    subtotal: { type: DataTypes.FLOAT, allowNull: false },
    shipping: { type: DataTypes.JSON, allowNull: false }, // Use JSON data type for shipping
    delivery_status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    payment_status: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: true });


const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
});

// Define associations
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = { Order, OrderItem };
