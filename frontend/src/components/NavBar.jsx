import React from 'react';
import Logo from "./Logo.jsx";
import Semestr from './Semestr.jsx';
import Login from './Login.jsx';
import "../css/Navbar.css";

function Navbar() {
    return (
        <header className="top-navbar">
            {/* Right Side (Start in RTL): Logo */}
            <div className="navbar-brand">
                <Logo />
            </div>

            {/* Left Side (End in RTL): Semester & Login */}
            <div className="navbar-actions">
                <Semestr />
                <Login />
            </div>
        </header>
    );
}

export default Navbar;