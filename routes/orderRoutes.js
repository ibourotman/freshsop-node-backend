const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Récupérer toutes les commandes d'un utilisateur avec les articles de commande et les produits peuplés
exports.getOrdersForUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate({
                path: 'items',  // Peupler les OrderItem dans chaque commande
                model: 'OrderItem',
                populate: { path: 'product' }  // Peupler les produits dans chaque OrderItem
            })
            .populate('user');  // Peupler l'utilisateur

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur' });
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};


exports.addProductToOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

        // Trouver l'ID le plus élevé dans la collection OrderItem
        const lastOrderItem = await OrderItem.findOne().sort({ _id: -1 });
        const newId = lastOrderItem ? lastOrderItem._id + 1 : 1;

        // Créer un nouvel article de commande avec un ID unique
        const orderItem = new OrderItem({
            _id: newId,  // Utiliser l'ID généré
            order: req.params.orderId,
            product: req.params.productId,
            quantity: req.body.quantity
        });

        // Sauvegarder l'article de commande
        await orderItem.save();

        // Ajouter l'ID de l'article de commande à la commande
        order.items.push(orderItem._id);
        await order.save();

        res.status(201).json({ message: 'Produit ajouté avec succès à la commande', orderItem });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du produit à la commande:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};




// Mettre à jour la quantité d'un article dans une commande
exports.updateOrderItemQuantity = async (req, res) => {
    try {
        const orderItem = await OrderItem.findById(req.params.itemId);
        if (!orderItem) return res.status(404).json({ message: 'Article non trouvé' });

        orderItem.quantity = req.body.quantity;
        await orderItem.save();

        res.status(200).json(orderItem);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Supprimer un article d'une commande
exports.deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.itemId);
        if (!orderItem) return res.status(404).json({ message: 'Article non trouvé' });

        res.status(200).json({ message: 'Article supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};


