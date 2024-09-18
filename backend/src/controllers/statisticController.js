const { Order, OrderItem } = require('../models/order');
const User = require('../models/user');
const { Op, fn, col } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('../models/product');
const Category = require('../models/category');

// Get total orders
exports.getTotalOrder = async (req, res) => {
    try {
        const totalOrders = await Order.count();
        res.json({ totalOrders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrdersByStatus = async (req, res) => {
    try {
        const statusCounts = await Order.findAll({
            attributes: [
                'delivery_status',
                [fn('COUNT', col('id')), 'total']
            ],
            group: ['delivery_status'],
            raw: true
        });
        res.json(statusCounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Total Customers
exports.getTotalCustomers = async (req, res) => {
    try {
        const totalCustomers = await User.count();
        res.json({ totalCustomers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Total Sales Today
exports.getTotalSalesToday = async (req, res) => {
    try {
        const today = new Date();
        const totalSalesToday = await Order.sum('total', {
            where: {
                createdAt: {
                    [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
                    [Op.lte]: new Date(today.setHours(23, 59, 59, 999)),
                }
            }
        });
        res.json({ totalSalesToday });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Monthly Sales
exports.getMonthlySales = async (req, res) => {
    try {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const totalSalesThisMonth = await Order.sum('total', {
            where: {
                createdAt: {
                    [Op.gte]: monthStart,
                    [Op.lte]: new Date(),
                }
            }
        });
        res.json({ totalSalesThisMonth });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Yearly Sales
exports.getYearlySales = async (req, res) => {
    try {
        const yearStart = new Date(new Date().getFullYear(), 0, 1);
        const totalSalesThisYear = await Order.sum('total', {
            where: {
                createdAt: {
                    [Op.gte]: yearStart,
                    [Op.lte]: new Date(),
                }
            }
        });
        res.json({ totalSalesThisYear });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getYearlySalesData = async (req, res) => {
    try {
        const results = await Order.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'], 
                [sequelize.fn('SUM', sequelize.col('total')), 'total'],
            ],
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))]
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSalesByCategory = async (req, res) => {
    try {
        const salesData = await OrderItem.findAll({
            attributes: [
                [fn('SUM', col('quantity')), 'totalQuantity'],
                [fn('SUM', col('price')), 'totalSales'],
            ],
            include: [
                {
                    model: Product,
                    attributes: ['categoryId'],
                    include: [
                        {
                            model: Category,
                            attributes: ['name'],
                        }
                    ]
                }
            ],
            group: ['Product.categoryId', 'Product.Category.name'],
            order: [[fn('SUM', col('quantity')), 'DESC']],
        });

        const formattedData = salesData.map(sale => ({
            category: sale.Product.Category.name,
            totalSales: parseFloat(sale.getDataValue('totalSales')),
        }));

        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
