// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category'); // Import Category model

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    new_price: { type: DataTypes.FLOAT },
    old_price: { type: DataTypes.FLOAT },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    available: { type: DataTypes.BOOLEAN, defaultValue: true },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category, 
            key: 'id',
        },
        onDelete: 'CASCADE', 
    }
});

// Define the relationship
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;
