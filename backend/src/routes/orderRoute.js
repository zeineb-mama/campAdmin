// routes/order.js
const express = require('express');
const { createOrder, getUserOrders, getAllOrder, editOrder, getOrderById, removeOrder, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

router
    .post('/create', createOrder)
    .get('/listorder', getAllOrder)
    .get('/user/:userId', getUserOrders)
    .get('/:id', getOrderById)
    .put('/edit', editOrder)
    .put('/edit', updateOrderStatus)
    .delete('/remove/:id', removeOrder)
module.exports = router;
