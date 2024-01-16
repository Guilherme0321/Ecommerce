import { useState } from "react"
import '../styles/nav.css'
import IconUser from '../images/user-circle.svg'
export const NavBar = () => {
    const [displayNav, setDisplayNav] = useState('block');

    const changeDisplay = () => {
        setDisplayNav(displayNav === 'none' ? 'block' : 'none');
    };
    return (
        <nav className="navbar navbar-inverse fixed-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="home">Pixel Purchases</a>
                <button className="navbar-toggler" type="button" onClick={() => changeDisplay()} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-2" id="navbarNav" style={{display: displayNav}}>
                    <ul className="navbar-nav">
                        <li className="nav-item px-1">
                            <a className="nav-link active" aria-current="page" href="home">Home</a>
                        </li>
                        <li className="nav-item px-1">
                            <a className="nav-link " href="products">Products</a>
                        </li>
                        <li className="nav-item px-1">
                            <a className="nav-link " href="about">About</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
                        <li className="nav-item px-1">
                           <a className="nav-link " href="login">Login</a>
                        </li>
                        <li className="nav-item px-1">
                            <a className="nav-link " href="register">Register</a>
                        </li>
                        <li className="nav-item py-0">
                            <a className="dropdown-toggle d-flex align-items-center py-0 mx-5" href="perfil" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                <img src={IconUser} className="rounded-circle" height="35" alt="" loading="lazy" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}