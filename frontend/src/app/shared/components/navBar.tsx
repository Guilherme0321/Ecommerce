import '../styles/nav.css'
import IconUser from '../images/user-circle.svg'
import { getCookie } from "./utils/cookies";
import { logout } from "../../service/userService";
export const NavBar = () => {
    const isAuthenticated = getCookie('token') !== null;
    const username = getCookie('username');
    const callLogout = () => {
        logout();
    }
    return (
        <nav className="navbar navbar-inverse fixed-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="home">Pixel Purchases</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-2" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item px-1">
                            <a className="nav-link active" aria-current="page" href="home">Home</a>
                        </li>
                        {isAuthenticated && <li className="nav-item px-1">
                            <a className="nav-link " href="products">Products</a>
                        </li>}
                        <li className="nav-item px-1">
                            <a className="nav-link " href="about">About</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                        {!isAuthenticated && <li className="nav-item px-1">
                           <a className="nav-link " href="login">Login</a>
                        </li>}
                        {!isAuthenticated && <li className="nav-item px-1">
                            <a className="nav-link " href="register">Register</a>
                        </li>}
                        {isAuthenticated && <div className="dropstart">
                            <button className="dropdown-toggle border-0 bg-transparent d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <p className='m-0'>{username}</p>
                                <img src={IconUser} className="rounded-circle" height="35" alt="" loading="lazy" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="perfil">Perfil</a></li>
                                <li><a className="dropdown-item" href="cartItems">Cart Items</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <form className="dropdown-item d-flex align-items-center">
                                        <button className="bg-transparent border-0 mx-0 px-0 text-danger fw-bold" onClick={callLogout}>Logout</button>
                                    </form>
                                </li>
                            </ul>
                        </div>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}