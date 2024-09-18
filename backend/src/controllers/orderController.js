// controllers/orderController.js
const { Order, OrderItem } = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product')

exports.createOrder = async (req, res) => {
    const { userId, cartItems } = req.body;
    try {
        // Calculate total amount
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.quantity * item.price;
        });
        // Create the order
        const order = await Order.create({ userId, totalAmount });
        // Create order items
        for (let item of cartItems) {
            const orderItem = await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            });

            if (!orderItem) {
                throw new Error(`Failed to create order item for productId ${item.productId}`);
            }
        }
        // Remove all items from cart after order is placed
        await Cart.destroy({ where: { userId } });
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
};


exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.findAll({
            where: { userId },
            include: { model: OrderItem, include: Product }
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll(
            {
                include: { model: OrderItem }
            }
        );
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editOrder = async (req, res) => {
    const { id, delivery_status } = req.body;
    try {
        const result = await Order.findByPk(id);
        if (result) {
            result.delivery_status = delivery_status;
            await result.save();
            res.json({
                success: true, message: "order updated successfully", result
            });
        } else {
            res.status(404).json({ success: false, message: "order not found" });
        }
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the order" });
    }
}

exports.updateOrderStatus = async (req, res) => {
    const { id, payment_status } = req.body;
    try {
        const result = await Order.findByPk(id);
        if (result) {
            result.payment_status = payment_status;
            await result.save();
            res.json({
                success: true, message: "order updated successfully", result
            });
        } else {
            res.status(404).json({ success: false, message: "order not found" });
        }
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the order" });
    }
}

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: { model: OrderItem, include: Product }
        });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Order.destroy({ where: { id: id } });
        if (result) {
            console.log("Removed");
            res.json({ success: true, message: "Order removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        console.error("Error removing Order:", error);
        res.status(500).json({ success: false, message: "An error occurred while removing the Order" });
    }
};
