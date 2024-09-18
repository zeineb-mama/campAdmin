const express = require('express');
const { addProductToCart, getCartItems, removeCartItem, updateCartItemQuantity, removeAllCart, removeAllItemsInCart } = require('../controllers/cartController');
const router = express.Router();

router
    .post('/add', addProductToCart)
    .get('/:userId', getCartItems)
    .delete('/remove/:userId/:productId', removeCartItem)
    .put('/update', updateCartItemQuantity)
    .get('/cartId', (req, res) => {
        if (req.session && req.session.cartId) {
            res.json({ cartId: req.session.cartId });
        } else {
            res.status(404).json({ error: 'Cart ID not found' });
        }
    });

module.exports = router;
