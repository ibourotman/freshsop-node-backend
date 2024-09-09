const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image_url: { type: String },
    weight: { type: String },
    country_of_origin: { type: String },
    quality: { type: String },
    category: { type: String },
    description: { type: String, default: '' }  // Same as Django's default=''
});

module.exports = mongoose.model('Product', productSchema);
