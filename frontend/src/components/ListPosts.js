import '../styles/ListPosts.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import like from '../assets/like.png'

function ListPosts({user, setUser}){

    //Déclare une variable pour stocker la liste des posts récupéré depuis l'API ainsi qu'une fonction de mise à jour
    const [listPosts, setListPost] = useState([]);

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
            fetch(`http://localhost:3000/api/posts`, requestOptions)
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
                    setListPost(data);
                });
        }
    }, []);

    //Fonction pour formatter la date
    function getParsedDate(date){
        //La date et l'heure sont séparées par un 'T' (split retourne un tableau contenant les éléments entre le caractere qui est le param)
        date = String(date).split('T');
        //La partie gauche est la date
        var days = String(date[0]).split('-');
        //La partie droite l'heure
        var hours = String(date[1]).split(':');
        return [days[2], '/', days[1],'/', days[0], ' ', hours[0], ':', hours[1]];
    }


    return(
        <div className="blockPosts">
            {/*On boucle sur la liste des posts pour afficher une card pour chaque post*/}
            {/*Chaque post est cliquable et redirige vers la page de ce dernier*/}
            {listPosts.map((post) => (
                <div key={post._id} className="card">
                    <img className="card-img-top" src={post.imageUrl} alt="Image post"/>
                    <div className="card-body">
                        <h5 className="card-title">
                            {post.name}
                        </h5>
                        <p className="card-text">{post.description}</p>
                        <p className="card-text">{post.likes} <img src={like} alt="icone pouce"/></p>
                        <p className="card-subtitle horodate">{getParsedDate(post.dateCreation)}</p>
                        <Link to={"/post/"+post._id} className="btn btn-primary">Voir le Post</Link>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default ListPosts;
