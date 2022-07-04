import '../styles/Login.css';
import React, {useEffect, useState} from "react";
import ListPosts from "./ListPosts";

function Login({user, setUser, isAuth, setIsAuth}){

    //Variables du state
    const [erreur, setErreur] = useState(false);
    const [textErreur, setTextErreur] = useState('');

    //debug pour afficher user
    useEffect(() => {
        console.log(user);
    }, [user]);

    //Fonction de validation du formulaire
    function handleSubmit(e) {
        //pour empecher la page de recharger
        e.preventDefault();
        //Création de la req API
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: e.target['email'].value,
                password : e.target['password'].value
            })
        };
        //Exécution de la req
        fetch('http://localhost:3000/api/auth/login ', requestOptions)
            .then(response => {
                //Si reponse API OK
                if (response.ok) {
                    setErreur(false);
                    setTextErreur("Tout est OK");
                    //console.log(response.json());
                    return response.json();
                } else {
                    setErreur(true);
                    setTextErreur("Connexion impossible ...");
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => {
                //On stocke dans le localStorage le userID et son token valable 24h
                localStorage.setItem('user', JSON.stringify(data));
                //On met à jour le user dans le state
                setIsAuth(true);
                setUser(JSON.stringify(data));
            });
    }

    {/*Si pas user pas co alors demande de connexion*/}
    {/*Sinon redirection vers la liste des posts*/}
    if(!isAuth){
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email :</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder='Entrez votre mail'/>
                </div>
                <div className="form-group">
                    <label>Mot de Passe : </label>
                    <input type="password" className="form-control" id="password" name="password" placeholder='Entrez votre mot de passe'/>
                </div>
                <button className="btn btn-primary">Connexion</button>
                {erreur && <p className="text-danger">{textErreur}</p>}
            </form>
        )
    }
    else return <ListPosts/>

}

export default Login;
