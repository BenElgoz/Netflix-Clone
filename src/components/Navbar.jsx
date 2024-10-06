import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.svg'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">

        <Link to="/">
          <img 
            src={logo}
            alt="Logo"
            className="navbar__logoImage"
          />
        </Link>
      </div>
      <div className="navbar__links">
        <Link to="/favorites" className="navbar__favorites">Ma Liste</Link>
      </div>
    </nav>
  );
}

export default Navbar;
