const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: { type: Number, required: true },  // Utilisation d'un entier pour _id
    user: { type: Number, ref: 'User', required: true },  // Référence à l'utilisateur
    items: [{ type: Number, ref: 'OrderItem' }],  // Liste des références d'articles de commande
    createdAt: { type: Date, default: Date.now }  // Date de création de la commande
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
