import '../styles/Header.css';
import {Link} from "react-router-dom";
import logo from '../assets/icon-left-font.png'

function Header({user, setUser, isAuth, setIsAuth}) {


    //Fonction de déconnexion
    function logout(e) {
        //ON met le boolean de connexion à false
        setIsAuth(false);
        //On supprime l'utilisateur du localStorage
        localStorage.removeItem('user');
        //On met le user dans le state à null via la fonction de mise à jour
        setUser(null);
    }


    return(
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">

                    <span className="fs-4">
                         <img className="app-logo" alt="groupomania logo" src={logo}/>
                    </span>
                </a>

                {/*On affiche les éléments du header en fonction de la connexion ou non de l'utilisateur*/}
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    {isAuth && <Link className="me-3 py-2 text-dark text-decoration-none" to="/posts">
                        Posts
                    </Link>}
                    {isAuth && <Link className="me-3 py-2 text-dark text-decoration-none" to="/post">
                        Nouveau Post
                    </Link>}
                    {!isAuth && <Link className="me-3 py-2 text-dark text-decoration-none" to="/subscribe">
                        Inscription
                    </Link>}
                    {!isAuth && <Link className="me-3 py-2 text-dark text-decoration-none" to="/login">
                        Connexion
                    </Link>}
                    {isAuth && <Link className="py-2 text-dark text-decoration-none" to="/" onClick={logout}>
                        Déconnexion
                    </Link>}
                </nav>
            </div>


        </header>
    )
}

export default Header;
