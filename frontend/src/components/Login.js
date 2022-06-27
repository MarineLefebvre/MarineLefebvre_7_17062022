import '../styles/Login.css';

function Login(){

    //Fonction de validation du formulaire
    function handleSubmit(e) {
        //pour emepcher la page de recharger
        e.preventDefault();
        alert(e.target['email'].value);
        alert(e.target['password'].value);
    }

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
            <button className="btn">Connexion</button>
            <p className="text-danger">Erreur</p>
        </form>
    )
}

export default Login;

