const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const User = require('../models/User');
const Product = require('../models/Product');

// Récupérer les commandes d'un utilisateur
router.get('/orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('items');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Supprimer un item de la commande
router.delete('/orders/:orderId/items/:itemId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        const orderItem = await OrderItem.findById(req.params.itemId);
        if (!orderItem) {
            return res.status(404).json({ message: 'Item non trouvé' });
        }
        order.items.pull(orderItem._id);
        await order.save();
        await orderItem.remove();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Modifier la quantité d'un item dans une commande
router.patch('/orders/:orderId/items/:itemId/update', async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.itemId);
        if (!orderItem) return res.status(404).json({ message: 'Item non trouvé' });
        orderItem.quantity = req.body.quantity;
        await orderItem.save();
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ajouter un produit à une commande
router.post('/orders/:orderId/items/:productId/add', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        const newItem = new OrderItem({
            order: order._id,
            product: req.params.productId,
            quantity: req.body.quantity
        });
        await newItem.save();
        order.items.push(newItem._id);
        await order.save();
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les produits
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer un produit par ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
