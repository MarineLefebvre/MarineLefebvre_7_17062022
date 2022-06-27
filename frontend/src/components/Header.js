import '../styles/Header.css';
import {Link} from "react-router-dom";
import logo from '../assets/icon-left-font.png'

function Header() {

    return(
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">

                    <span className="fs-4">
                         <img className="app-logo" alt="groupomania logo" src={logo}/>
                    </span>
                </a>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/posts">
                        Posts
                    </Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/post">
                        Nouveau Post
                    </Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/subscribe">
                        Inscription
                    </Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/login">
                        Connexion
                    </Link>
                    <Link className="py-2 text-dark text-decoration-none" to="/">
                        Déconnexion
                    </Link>
                </nav>
            </div>


        </header>
    )
}

export default Header;
