// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');

const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false }, // assuming each cart is linked to a user
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        }
    },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

Cart.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Cart, { foreignKey: 'productId' });

module.exports = Cart;
