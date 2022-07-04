# GROUPOMANIA MARINE LEFEBVRE

## Backend - API

- Il est nécessaire d'exécuter la commande `npm i` dans le répertoire frontend pour installer les dépendances.
- La commande pour lancer l'API est la suivante : `nodemon server.js` (l'API tournse sur le port 3000)

### ATTENTION il est nécessaire de créer un fichier `.env` à la racine pour que l'API fonctionne !!
#### Ce fichier à pour but de configurer les informations sensibles à utiliser et ne pas les stocker dans le code

#### Un exemple de structure de ce fichier se trouve dans le fichier `.env.example`
Ce dernier contient :
`USER_BDD="login"`
`PWD_BDD="pwd"`
`DATABASE="databaseName"`
`SECRET_KEY="randomKey"`

Il sera nécessaire de créer le fichier .env et de modifier les valeurs entre guillements par celles fourni dans le fichier `valuesEnv.txt` du dépôt avant de lancer l'api.

## Frontend - React

- Il est nécessaire d'exécuter la commande `npm i` dans le répertoire frontend pour installer les dépendances.
- La commande pour lancer l'application est la suivante : `npm run start`
- Groupamania sera ensuite accessible via l'adresse : `http://localhost:3001/login` depuis un navigateur.
- Les informations de connexion pour le compte Administrateur sont fournis dans le fichier `user.txt`.
