const mongoose = require('mongoose');
const Order = require('./models/Order');  // Assurez-vous que le modèle Order est bien importé
const OrderItem = require('./models/OrderItem');  // Assurez-vous que le modèle OrderItem est bien importé

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/freshshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.log('Erreur de connexion à MongoDB', err));

// Insertion des OrderItems
const orderItems = [
    { _id: 1, order: 1, product: 1, quantity: 3 },
    { _id: 2, order: 1, product: 3, quantity: 1 },
    { _id: 3, order: 2, product: 5, quantity: 2 }
];

OrderItem.insertMany(orderItems)
    .then(() => {
        console.log('OrderItems insérés avec succès');

        // Insertion des Orders après que les OrderItems soient insérés
        const orders = [
            { _id: 1, user: 1, items: [1, 2], createdAt: '2023-09-04T12:00:00.000Z' },
            { _id: 2, user: 2, items: [3], createdAt: '2023-09-04T12:30:00.000Z' }
        ];

        return Order.insertMany(orders);
    })
    .then(() => {
        console.log('Orders insérés avec succès');
        mongoose.connection.close();  // Fermer la connexion à MongoDB après l'insertion
    })
    .catch(error => {
        console.error('Erreur lors de l\'insertion des données:', error);
        mongoose.connection.close();  // Fermer la connexion en cas d'erreur
    });
