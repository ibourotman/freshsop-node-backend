const express = require('express');
const cors = require('cors');  // Ajouter CORS
const mongoose = require('mongoose');
const path = require('path');

const apiRoutes = require('./routes/api');
const app = express();
const port = 8000;

// Activer CORS pour toutes les requêtes
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Configurer le dossier "public" pour les fichiers statiques (images, CSS, etc.)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/freshshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connecté à MongoDB"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));

// Utilisation des routes API
app.use('/api', apiRoutes);

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
