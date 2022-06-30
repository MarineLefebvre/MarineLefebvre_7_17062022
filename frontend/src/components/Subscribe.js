import '../styles/Subscribe.css';
import { useState } from 'react'

function Subscribe(){
    //créer la variable mailValue et la fonction qui va permettre de changer sa valeur dans le state local avec useState
    const [mailValue, setMailValue] = useState('');
    const [erreur, setErreur] = useState(false);
    const [textErreur, setTextErreur] = useState('');

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
        //pour empecher la page de recharger
        e.preventDefault();
        //Création de la req API
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: mailValue,
                password : e.target['password'].value,
                //Par défaut pas admin
                isAdmin : 0
            })
        };
        //Exécution de la req
        fetch('http://localhost:3000/api/auth/signup', requestOptions)
            .then(response => {
                if (response.ok) {
                    setErreur(false);
                    setTextErreur("Tout est OK");
                    alert("L'utilisateur a bien été créé ! Vous pouvez vous connecter");
                    return response.json();
                } else {
                    setErreur(true);
                    setTextErreur("Une erreur est survenue....");
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => console.log(data));
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
            <button className="btn-primary btn">Inscription</button>
            {erreur && <p className="text-danger">{textErreur}</p>}
        </form>
    )
}

export default Subscribe;
