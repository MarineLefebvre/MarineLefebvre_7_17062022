import '../styles/Header.css';

function Header() {
    return(
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-4 logoColor">Groupomania</span>
                </a>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Posts</a>
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Inscription</a>
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Se connecter</a>
                    <a className="py-2 text-dark text-decoration-none" href="#">Déconnexion</a>
                </nav>
            </div>

            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal logoColor">Groupomania</h1>
            </div>
        </header>
    )
}

export default Header;
