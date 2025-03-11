// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Nous verrons ensuite le CSS pour Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">E-Commerce</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">Panier</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
