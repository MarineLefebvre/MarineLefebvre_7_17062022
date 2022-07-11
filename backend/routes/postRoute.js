//ce fichier va uniquement permettre de faire le routing => il appelera la méthode API dans le controller

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postController');

module.exports = router;

//Différence entre GET et POST :
//GET : transporte params dans url => ex /:id
//POST : transporte param dans le body

//On ajoute "auth" à l'ensemble des routes car l'utilisateur a besoin d'être connecté pour s'y rendre
//ce qui empeche par exemple d'accéder au listing des posts sans être connecté
//si l'utilisateur n'est pas connecté et qu'il se rend à l'adresse : http://localhost:4200/posts => il sera invité à se connecter

//on ajoute également multer pour les méthodes ayant besoin de sotcker/supprimer/mettre à jour des images

//récupérer tout les éléments
router.get('/', auth,  postCtrl.getAll);

//Insérer un objet en base de données
router.post('/', auth, multer, postCtrl.createPost);

//récupérer un objet spécifique
router.get('/:id', auth, postCtrl.getOnePost);

//mettre à jour un objet spécifique
router.put('/:id', auth, multer, postCtrl.modifyPost);

//supprimer un objet spécifique
router.delete('/:id', auth, postCtrl.deletePost);

//mettre à jour like et dislike
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;
