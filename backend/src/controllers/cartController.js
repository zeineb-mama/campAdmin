// controllers/cartController.js
const Cart = require('../models/cart')
const Product = require('../models/product')

exports.addProductToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await Cart.findAll({ where: { userId }, include: Product });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.removeCartItem = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });
        if (cartItem) {
            await cartItem.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const cartItem = await Cart.findByPk(id);
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
