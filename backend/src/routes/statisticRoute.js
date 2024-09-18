// routes/order.js
const express = require('express');
const { getTotalOrder, GetOrderByDate, getUserViews, getOrdersByStatus, getTotalCustomers, getTotalSalesToday, getMonthlySales, getYearlySales, getYearlySalesData, getSalesByCategory } = require('../controllers/statisticController');
const router = express.Router();

router
    .get('/orders/total', getTotalOrder)
    // .get('/orders/by-date', GetOrderByDate)
    // .get('/site-views', getUserViews)
    .get('/orders/status', getOrdersByStatus)
    .get('/total-customers', getTotalCustomers)
    .get('/total-sales-today', getTotalSalesToday)
    .get('/monthly-sales', getMonthlySales)
    .get('/yearly-sales', getYearlySales)
    .get('/yearly-sales-data', getYearlySalesData)
    .get('/sales-by-category', getSalesByCategory)

module.exports = router;
