const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Ajoute CORS
const ProductController = require('./routes/productRoutes');
const OrderController = require('./routes/orderRoutes');
const UserController = require('./routes/userRoutes');
const app = express();

app.use(express.json());

// Activer CORS
app.use(cors());  // Ajoute cette ligne pour activer CORS

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/freshshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.log('Erreur de connexion à MongoDB', err));

// Routes des produits
app.get('/api/products', ProductController.getAllProducts);
app.get('/api/products/:id', ProductController.getProductById);
app.post('/api/products', ProductController.createProduct);
app.put('/api/products/:id', ProductController.updateProduct);
app.delete('/api/products/:id', ProductController.deleteProduct);

// Routes des commandes
app.get('/api/orders/:userId', OrderController.getOrdersForUser);
app.post('/api/orders/:orderId/items/:productId/add', OrderController.addProductToOrder);
app.delete('/api/orders/:orderId/items/:itemId', OrderController.deleteOrderItem);

app.get('/api/users', UserController.getAllUsers);


// Démarrage du serveur
const port = 8000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
