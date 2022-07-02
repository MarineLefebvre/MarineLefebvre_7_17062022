const Post = require('../models/postModel');
const fs = require('fs');

//définition des méthode pour les posts/interaction avec la BDD

exports.createPost = (req, res, next) => {
    //récupérer le post dans le body
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        //Récupèrer l'image dans le file passé à la requête
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        usersLiked : []
    });
    //save() permet de sotocker un objet en BDD
    post.save()
        //then() => ce qui est exécuté après la requête API si succès
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        //catch => ce qui est exécuté après la reqête API si erreur
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    //findOne => récupère un élément qui correspond au param, ici l'id du post
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyPost = (req, res, next) => {
    //On recherche le post pour supprimer l'image correspondante
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const postObject = req.file ?
                {
                    ...JSON.parse(req.body.post),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
            //updateOne => mise à jour de l'élement qui a le param passé, ici l'id du post et l'userId (pour sécuriser)
            Post.updateOne({ _id: req.params.id, userId : postObject.userId}, { ...postObject, _id: req.params.id })
                .then(() => {
                    const filename = post.imageUrl.split('/images/')[1];
                    //on supprime l'image si on a un nouveau fichier image
                    if(req.file){
                        fs.unlink(`images/${filename}`, () => {
                            console.log("image supprimé");
                        });
                    }
                    res.status(200).json({ message: 'Objet modifié !'})
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                //deleteOne => supprimer l'element qui a le param, ici l'id de la post
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAll = (req, res, next) => {
    //find => récupère tout en BDD
    Post.find().sort({"dateCreation": "desc"}).then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.likePost = (req, res, next) => {
    //récupération du post pour connaitre le nombre de like
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            let likes = post.likes;
            let usersLiked = post.usersLiked;
            //si l'utilisateur n'a pas encore liké
            if(req.body.like === 1){
                likes = likes+1;
                usersLiked.push(req.body.userId);
            }
            //si l'utilisateur n'a pas encore disliké
            /*else if(req.body.like === -1){
                dislikes = dislikes+1;
                usersDisliked.push(req.body.userId);
            }*/
            //si l'utilisateur avait déjà liké ou disliké
            else {
                //suppression user de la liste des users qui ont like et on décremente nb like si on trouve le user dans le tab
                for (let i = 0; i < usersLiked.length; i++) {
                    if (usersLiked[i] === req.body.userId) {
                        usersLiked.splice(i, 1);
                        likes = likes-1;
                    }
                }
                //suppression user de la liste des users qui ont dislike et on décremente nb dislike si on trouve le user dans le tab
                /*for (let i = 0; i < usersDisliked.length; i++) {
                    if (usersDisliked[i] === req.body.userId) {
                        usersDisliked.splice(i, 1);
                        dislikes = dislikes-1;
                    }
                }*/
            }
            Post.updateOne({ _id: req.params.id }, { likes: likes,usersLiked : usersLiked})
                .then(() =>{
                    res.status(200).json({ message: 'Objet modifié !'})
                })
                .catch(error => res.status(400).json({ error }));
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


