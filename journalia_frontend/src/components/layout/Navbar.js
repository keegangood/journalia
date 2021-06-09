import React from 'react';
import './scss/Navbar.scss';

import { ReactComponent as Logo } from '../../assets/img/Logo.svg';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark py-0" id="desktop-nav">
            <div className="container-fluid d-flex" id="navbar-contents">
                <a href="#" className="navbar-brand">
                    <Logo />
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item d-flex">
                        <a href="/signup" className="nav-link">Sign up</a>
                    </li>
                    <li className="nav-item d-flex">
                        <a href="/login" className="nav-link">Log in</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
