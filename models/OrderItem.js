const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    _id: { type: Number, required: true },  // Utilisation d'un entier pour _id
    order: { type: Number, ref: 'Order', required: true },  // Référence à la commande
    product: { type: Number, ref: 'Product', required: true },  // Référence au produit
    quantity: { type: Number, required: true }  // Quantité de produits dans l'ordre
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
module.exports = OrderItem;
