import '../styles/OnePost.css';
import {useEffect, useState} from "react";
import like from '../assets/like.png'
import like_green from '../assets/like_green.png'


function OnePost({user, setUser}) {

    //Déclare une variable pour stocker le post retourné par l'API ainsi qu'une fonction de mise à jour
    const [post, setPost] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    //variable pour savoir si l'utilsateur à déjà liké ou non le post
    const [isLiked, setisLiked] = useState(false);

    // useEffect et [] pour effectuer la req API uniquement lors du premier appel du component
    useEffect(() => {

        //On protège l'url => si l'utilisateur pas authent on le redirige vers la page de connexion
        if(!JSON.parse(localStorage.getItem('user'))) window.location = "/";

        else {
            //ON prépare la req en mettant le token dans le header
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': JSON.parse(localStorage.getItem('user')).token,
                }
            };

            //Exécution de la req de type GET
            //$permet d'interpréter ce qui suit
            //on récupère l'id dans l'url
            fetch(`http://localhost:3000/api/posts/${window.location.href.split("/post/")[1]}`, requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Une erreur est survenue....');
                    }
                })
                .then(data => {
                    //data correspond au post récupéré
                    console.log(data);
                    //on regarde si l'id de l'utilisateur se trouve dans la liste des utilisateurs ayant liké le post
                    for (let i = 0; i < data.usersLiked.length; i++) {
                        if (data.usersLiked[i] === JSON.parse(localStorage.getItem('user')).userId) {
                            setisLiked(true);
                        }
                    }
                    //On stocke le résultat de l'API dans la variable
                    setPost(data);
                    setIsLoad(true);
                });
        }
    }, []);

    //fonction pour retourner sur la liste des posts
    function backToList(){
        window.location = '/posts';
    }

    //fonction pour mettre à jour un post si il a été créé par l'utilisateur
    function updatePost(){
        //On redirige vers la page de création de post en passant l'id du post dans l'url
        window.location = '/updatePost/'+post._id;
    }

    //fonction pour supprimer un post si il a été créé par l'utilisateur
    function deletePost(){
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': JSON.parse(user).token,
            }
        };

        //Exécution de la req de type DELETE
        fetch(`http://localhost:3000/api/posts/${post._id}`,requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => {
                console.log(data);
                alert("Le post a bien été supprimé !");
                backToList();
            });
    }

    //Fonction pour like et retirer son like d'un post
    function likePost(){
        let valueLikeApi;
        //ON inverse la valeur du boolean au click sur le pouce
        if (isLiked) {
            setisLiked(false);
            valueLikeApi = 0;
            //On change manuellement la valeur du like pour l'afficher
            post.likes = post.likes-1;
        }
        else {
            setisLiked(true);
            valueLikeApi = 1;
            //On change manuellement la valeur du like pour l'afficher
            post.likes = post.likes+1;
        }

        //REQ API pour le like
        const requestOptionsLike = {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(user).token,
                'Content-Type': 'application/json'
            },
            //ON ajoute la valeur du like/unlike et le userId au body
            body: JSON.stringify({
                userId: JSON.parse(user).userId,
                //1 pour like et 0 pour retirer le like
                like: valueLikeApi
            })
        };

        //Exécution de la req de type POST
        //1 pour liker et 0 pour retirer le like
        fetch(`http://localhost:3000/api/posts/${post._id}/like`,requestOptionsLike)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => {
                console.log(data);
            });
    }

    return(
        <div>
            {/*On affiche que si on a déjà récupéré le post*/}
            {isLoad && <div className="post-container">
                <img src={post.imageUrl} alt="image du post"/>
                <div className="post-info">
                    <h1 className="post-name">{post.name}</h1>
                    <p>{post.description}</p>
                    <div className="like-buttons">
                        <div className="likes">
                            <button className="btn" onClick={likePost}>
                                {/*si l'utilisateur à déjà liké on affiche un pouce vert sinon un noir*/}
                                {!isLiked && <img src={like} alt="icone pouce non liké"/>}
                                {isLiked && <img src={like_green} alt="icone pouce liké"/>}
                                <span id="nbLikes">{post.likes}</span>
                            </button>
                        </div>

                    </div>
                    <div className="control-buttons">
                        <button className="btn btn-warning" onClick={backToList}>Retour</button>
                        {/*On affiche le bouton de suppression et mise à jour uniquement si le post à été créé par l'utilisateur actuel
                        Ou si ce dernier est admin*/}
                        {(JSON.parse(localStorage.getItem('user')).isAdmin || JSON.parse(localStorage.getItem('user')).userId === post.userId) && <div className="admin-btn">
                            <button className="btn btn-primary" onClick={updatePost}>Modifier</button>
                            <button className="btn btn-danger btn-delete" onClick={deletePost}>Supprimer</button>
                        </div>}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default OnePost;
