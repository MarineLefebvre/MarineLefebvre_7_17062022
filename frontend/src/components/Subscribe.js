import '../styles/Subscribe.css';
import { useState } from 'react'

function Subscribe(){
    //créer la variable mailValue et la fonction qui va permettre de changer sa valeur dans le state local avec useState
    const [mailValue, setMailValue] = useState('');

    //On stocke la valeur de l'input
    function handleInput(e) {
        setMailValue(e.target.value);
    }

    //lorsque l'on sort du champ si pas de @ alors alert car l'adresse mail n'est pas valide
    function handleBlur() {
        if (!mailValue.includes('@')) {
            alert("Attention, il n'y a pas d'@, ceci n'est pas une adresse valide 😥");
        }
    }

    //Fonction de validation du formulaire
    function handleSubmit(e) {
        //pour emepcher la page de recharger
        e.preventDefault();
        alert(e.target['password'].value);
        alert(mailValue);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email :</label>
                {/*Utilisation d'un champ de formulaire contrôlé pour érifier la validité de l'adresse mail*/}
                <input type="email" className="form-control" id="email" name="email"
                       placeholder='Entrez votre mail'
                       onChange={handleInput}
                       value={mailValue}
                       onBlur={handleBlur}
                />
            </div>
            <div className="form-group">
                <label>Mot de Passe :</label>
                <input type="password" className="form-control" id="password" name="password" placeholder='Entrez votre mot de passe'/>
            </div>
            <button className="btn">Inscription</button>
            <p className="text-danger">ERREUR</p>
        </form>
    )
}

export default Subscribe;
