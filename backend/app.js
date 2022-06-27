const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

//utilisation des vaiables d'environnements
require('dotenv').config();

const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoute');


app.use(express.json());

//connexion a la base mongo db
mongoose.connect('mongodb+srv://'+process.env.USER_BDD+':'+process.env.PWD_BDD+'@cluster0.9zacl.mongodb.net/'+process.env.DATABASE+'?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    //succès
    .then(() => console.log('Connexion à MongoDB réussie !'))
    //erreur
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//utilisation de cors pour utiliser les requete extérieur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//repertoire des images
app.use('/images', express.static(path.join(__dirname, 'images')));

//utilisation du router en ajoutant la base de l'url qui s'ajoutera devant les url défini dans routes/postController.js
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
