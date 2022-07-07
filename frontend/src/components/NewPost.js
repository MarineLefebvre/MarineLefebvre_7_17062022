import '../styles/NewPosts.css';
import {useEffect, useState} from "react";

function NewPost({user}){

    //Déclare une variable pour stocker le post retourné par l'API ainsi qu'une fonction de mise à jour
    const [post, setPost] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    //on ajoute un contrôle sur l'image pour la stocker dès qu'elle change
    const [imageValue, setImageValue] = useState('');
    const [image, setImage] = useState();


    // useEffect et [] pour effectuer la req API uniquement lors du premier appel du component
    /*Au premier appel du component on regarde si il y a un postId dans l'url, si il y a, on fait un appel API
    Pour récupérer le post et afficher les infos dans le formulaire*/
    useEffect(() => {

        //On protège l'url => si l'utilisateur pas authent on le redirige vers la page de connexion
        if(!JSON.parse(localStorage.getItem('user'))) window.location = "/";

        else {
            setIsLoad(false);
            //stockage du postId
            const postId = window.location.href.split("/updatePost/")[1];

            if (postId) {
                //ON prépare la req en mettant le token dans le header
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization': JSON.parse(localStorage.getItem('user')).token,
                    }
                };

                //Exécution de la req de type GET
                fetch(`http://localhost:3000/api/posts/${postId}`, requestOptions)
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
            }
        }
    }, []);

    //On stocke la valeur de l'input image
    function changeImage(e) {
        const file = e.target.files[0];
        //ON stocke le fichier image
        setImage(file);
        //On crée un objectURL pour l'afficher
        setImageValue(URL.createObjectURL(file));
    }

    //ICI on utilise un formualire non contrôlé (sauf image) car pas de contrôle à faire sur les champs
    //Fonction de validation du formulaire
    function handleSubmit(e) {
        //pour emepcher la page de recharger
        e.preventDefault();
        //ON crée un formData (mise en forme des données du body)
        const formData = new FormData();
        let typeReq;
        //ON y ajoute le post
        formData.append('post', JSON.stringify({
            name: e.target['titre'].value,
            description : e.target['description'].value,
            userId : JSON.parse(user).userId,
            dateCreation : new Date()
        }));
        //ON y ajoute l'image
        formData.append('image', image);

        //ON détermine le type de la requete en fonction de si on est en création ou modification
        if(!isLoad){
            typeReq='POST';
        }
        else typeReq='PUT';

        //ON ajoute dans le header le token d'authent
        const requestOptions = {
            method: typeReq,
            headers: {
                'Authorization': JSON.parse(user).token
            },
            body: formData
        };

        //Si on a pas récupéré de post => mode création => on joue la req API de création
        if(!isLoad){
            //Exécution de la req
            fetch('http://localhost:3000/api/posts', requestOptions)
                .then(response => {
                    if (response.ok) {
                        alert("Le post a bien été créé !");
                        return response.json();
                    } else {
                        throw new Error('Une erreur est survenue....');
                    }
                })
                .then(data => {
                    console.log(data);
                    window.location = '/posts';
                });
        }
        //Sinon la req API d'update
        else{
            //Exécution de la req
            fetch(`http://localhost:3000/api/posts/${window.location.href.split("/updatePost/")[1]}`, requestOptions)
                .then(response => {
                    if (response.ok) {
                        alert("Le post a bien été mis à jour !");
                        return response.json();
                    } else {
                        throw new Error('Une erreur est survenue....');
                    }
                })
                .then(data => {
                    console.log(data);
                    window.location = '/posts';
                });
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Titre</label>
                {/*En update si on a récupéré un post, alors on prérempli la valeur*/}
                {!isLoad && <input type="text" className="form-control" id="titre" name="titre" placeholder="Veuillez saisir un titre" required/>}
                {isLoad && <input type="text" className="form-control" id="titre" name="titre" placeholder="Veuillez saisir un titre" defaultValue={post.name} required/>}
            </div>
            <div className="form-group">
                <label>Description</label>
                {/*En update si on a récupéré un post, alors on prérempli la valeur*/}
                {!isLoad && <input type="text" className="form-control" id="description" name="description" placeholder="Veuillez saisir une description" required/>}
                {isLoad && <input type="text" className="form-control" id="description" name="description" placeholder="Veuillez saisir une description" defaultValue={post.description} required/>}
            </div>
            <div className="form-group">
                {/*En update si on a récupéré un post, l'image n'est pas obligatoire*/}
                {!isLoad && <input type="file" accept="image/*" id="image" name="image" required
                       onChange={changeImage}
                />}
                {isLoad && <input type="file" accept="image/*" id="image" name="image"
                                   onChange={changeImage}
                />}
                {/*En update si on a récupéré un post, alors on prérempli la valeur
                Ou on affiche l'image uniquement si on en a chargé une*/}
                {imageValue && <img src={imageValue} className="imagePost" alt="image du post"/>}
                {(isLoad && !imageValue) && <img src={post.imageUrl} className="imagePost" alt="image du post"/>}
            </div>
            {/*Si on est en mode mise à jour, on affcihe mettre à jour sinon créer*/}
            {!isLoad && <button className="btn btn-primary">Créer un post</button>}
            {isLoad && <button className="btn btn-primary">Mettre à jour le post</button>}
        </form>
    )
}

export default NewPost;
