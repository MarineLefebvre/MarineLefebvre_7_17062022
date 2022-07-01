import '../styles/NewPosts.css';
import {useState} from "react";

function NewPost({user}){

    //on ajoute un contrôle sur l'iamge pour la scoker dès qu'ele change
    const [imageValue, setImageValue] = useState('');
    const [image, setImage] = useState();

    //On stocke la valeur de l'input image
    function changeImage(e) {
        const file = e.target.files[0];
        //ON stocke le fichier image
        setImage(file);
        //On crée un objectURL pour l'afficher
        setImageValue(URL.createObjectURL(file));
    }

    //TODO envoi image
    //ICI on utilise un formualire non contrôlé (sauf image) car pas de contrôle à faire sur les champs
    //Fonction de validation du formulaire
    function handleSubmit(e) {
        //pour emepcher la page de recharger
        e.preventDefault();
        //ON crée un formData (mise en forme des données du body)
        const formData = new FormData();
        //ON y ajoute le user
        formData.append('post', JSON.stringify({
            name: e.target['titre'].value,
            description : e.target['description'].value,
            userId : JSON.parse(user).userId,
            dateCreation : new Date()
        }));
        //ON y ajoute l'image
        formData.append('image', image);

        //ON ajoute dans le header le token d'authent
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': JSON.parse(user).token
            },
            body: formData
        };

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

    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Titre</label>
                <input type="text" className="form-control" id="titre" name="titre" placeholder="Veuillez saisir un titre" required/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" id="description" name="description" placeholder="Veuillez saisir une description" required/>
            </div>
            <div className="form-group">
                <input type="file" accept="image/*" id="image" name="image" required
                       onChange={changeImage}
                />
                {/*On affiche l'image uniquement si on en a chargé une*/}
                {imageValue && <img src={imageValue} className="imagePost" alt="image du post"/>}
            </div>
            <button className="btn btn-primary">Créer un post</button>
        </form>
    )
}

export default NewPost;
