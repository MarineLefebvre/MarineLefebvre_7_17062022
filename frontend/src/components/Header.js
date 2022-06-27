import '../styles/Header.css';
import {Link} from "react-router-dom";
import logo from '../assets/icon-left-font.png'

function Header() {
    return(
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="left-nav collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/posts">
                                Liste des Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/post">
                                Nouveau Post
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="logo collapse navbar-collapse">
                    <div className="logo-image">
                        <img alt="groupomania logo" src={logo}/>
                    </div>
                </div>
                <div className="right-nav collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/subscribe">
                                Inscription
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login">
                                Connexion
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/">
                                LOGOUT
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;
