const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Ajouter un nouveau produit
exports.createProduct = async (req, res) => {
    const { name, price, image_url, weight, country_of_origin, quality, category, description } = req.body;
    try {
        const newProduct = new Product({ name, price, image_url, weight, country_of_origin, quality, category, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json({ message: 'Produit supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};
