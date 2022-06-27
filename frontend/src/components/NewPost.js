import '../styles/NewPosts.css';
import {useState} from "react";

function NewPost(){

    //on ajoute un contrôle sur l'iamge pour la scoker dès qu'ele change
    const [imageValue, setImageValue] = useState('');

    //On stocke la valeur de l'input image
    function changeImage(e) {
        const [file] = e.target.files;
        setImageValue(URL.createObjectURL(file));
    }

    //ICI on utilise un formualire non contrôlé (sauf image) car pas de contrôle à faire sur les champs
    //Fonction de validation du formulaire
    function handleSubmit(e) {
        //pour emepcher la page de recharger
        e.preventDefault();
        alert(e.target['titre'].value);
        alert(e.target['description'].value);
        alert(imageValue);
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
                <input type="file" accept="image/*" name="image" required
                       onChange={changeImage}
                />
                {/*On affiche l'image uniquement si on en a chargé une*/}
                {imageValue && <img src={imageValue} className="imagePost" alt="image du post"/>}
            </div>
            <button className="btn">Créer un post</button>
        </form>
    )
}

export default NewPost;
