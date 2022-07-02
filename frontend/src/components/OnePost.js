import '../styles/OnePost.css';
import {useEffect, useState} from "react";


function OnePost({user, setUser}) {

    //Déclare une variable pour stocker le post retourné par l'API ainsi qu'une fonction de mise à jour
    const [post, setPost] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    // useEffect et [] pour effectuer la req API uniquement lors du premier appel du component
    useEffect(() => {

        //ON prépare la req en mettant le token dans le header
        const requestOptions = {
            method: 'GET',
            headers: {
                //TODO : pourquoi user qui est passé depuis le App.js est undefined la première fois ?
                'Authorization': JSON.parse(localStorage.getItem('user')).token,
            }
        };

        //Exécution de la req de type GET
        fetch(`http://localhost:3000/api/posts/${window.location.href.split("/post/")[1]}`,requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => {
                //data correspond à la liste des posts du plus ancien au plus récent
                console.log(data);
                //On stocke le résultat de l'API dans la variable
                setPost(data);
                setIsLoad(true);
            });
    }, []);

    //fonction pour retourner sur la liste des posts
    function backToList(){
        window.location = '/posts';
    }

    //fonction pour mettre à jour un post si il a été créé par l'utilisateur
    function updatePost(){
        alert("update");
    }

    //fonction pour supprimer un post si il a été créé par l'utilisateur
    function deletePost(){
        const requestOptions = {
            method: 'DELETE',
            headers: {
                //TODO : pourquoi user qui est passé depuis le App.js est undefined la première fois ?
                'Authorization': JSON.parse(localStorage.getItem('user')).token,
            }
        };

        //Exécution de la req de type GET
        fetch(`http://localhost:3000/api/posts/${post._id}`,requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => {
                //data correspond à la liste des posts du plus ancien au plus récent
                console.log(data);
                alert("Le post a bien été supprimé !");
                backToList();
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
                            {/*TODO LIKE ICON*/}
                            <span>{post.likes}</span>
                        </div>

                    </div>
                    <div className="control-buttons">
                        <button className="btn btn-warning" onClick={backToList}>Retour</button>
                        {/*On affiche le bouton de suppression et mise à jour uniquement si le post à été créé par l'utilisateur actuel
                        Ou si ce dernier est admin*/}
                        {/*TODO pourquoi user qui est passé depuis le App.js est undefined la première fois ?*/}
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
