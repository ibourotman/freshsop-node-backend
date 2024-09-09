const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },  // Reference to Order
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },  // Reference to Product
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
