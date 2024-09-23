const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: { type: Number, required: true },  // Utilisation d'un entier pour _id
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
    weight: { type: String, required: true },
    country_of_origin: { type: String, required: true },
    quality: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
