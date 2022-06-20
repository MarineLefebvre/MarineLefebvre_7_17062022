import '../styles/Header.css';
import {Link} from "react-router-dom";

function Header() {
    return(
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-4 logoColor">Groupomania</span>
                </a>

                {/*Link To permet de passer un url pour matcher avec les routes défini dans index.js et afficher le bon component dans la single page app*/}
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <Link to="/posts" className="me-3 py-2 text-dark text-decoration-none" href="#">Posts</Link>
                    <Link to="/post" className="me-3 py-2 text-dark text-decoration-none" href="#">Créer un Post</Link>
                    <Link to="/subscribe" className="me-3 py-2 text-dark text-decoration-none" href="#">Inscription</Link>
                    <Link to="/login" className="me-3 py-2 text-dark text-decoration-none" href="#">Se connecter</Link>
                    <Link to="/logout" className="py-2 text-dark text-decoration-none" href="#">Déconnexion</Link>
                </nav>
            </div>

            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal logoColor">Groupomania</h1>
            </div>
        </header>
    )
}

export default Header;
