const jwt = require('jsonwebtoken');

//permet de générer un tocken d'authentification reconnu par le site, ce token permet à l'utilisateur de naviguer
//ce qui empeche par exemple d'accéder au listing des post sans être connecté
//si l'utilisateur n'est pas connecté et qu'il se rend à l'adresse : http://localhost:4200/posts => il sera invité à se connecter

module.exports = (req, res, next) => {
    try {
        //Récupération du token depuis le header de la requête API
        const token = req.headers.authorization;
        //Ici on a une chaine de caractère aléatoire pour la clef de hashage pour le token d'authent
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.userId;
        req.auth = { userId };
        //vérifie la validité du token, si il est valable la requette est effectuée sinon une exception est lever et la requete est pas effectuée
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
