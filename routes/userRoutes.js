const User = require('../models/User');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Récupérer un utilisateur spécifique
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = new User({ username, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Supprimer un article d'une commande
exports.deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByIdAndDelete(req.params.itemId);
        if (!orderItem) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        // Optionnel : mettre à jour la commande en supprimant l'article de la liste des items
        const order = await Order.findById(req.params.orderId);
        if (order) {
            order.items = order.items.filter(item => item.toString() !== req.params.itemId);
            await order.save();
        }

        res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

