const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],  // List of OrderItems
    createdAt: { type: Date, default: Date.now }  // Automatically store creation date
});

module.exports = mongoose.model('Order', orderSchema);
