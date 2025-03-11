import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/categorie')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) =>
          a.nom_categorie.localeCompare(b.nom_categorie)
        );
        setCategories(sorted);
      })
      .catch(err =>
        console.error('Erreur lors de la récupération des catégories :', err)
      );
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo-container">
          <img src={logo} alt="Logo" className="nav-logo-image" />
          <Link to="/" className="nav-logo-text">AnimeShop</Link>
        </div>
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Accueil</Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link" onClick={toggleDropdown}>
                Catégories
              </span>
              {showDropdown && (
                <ul className="dropdown-menu" onMouseLeave={closeDropdown}>
                  {categories.map(cat => (
                    <li key={cat.id_categorie} className="dropdown-item">
                      <Link to={`/categorie/${cat.id_categorie}`} className="dropdown-link">
                        {cat.nom_categorie}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Panier</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-links">
          <Link to="/auth" className="nav-link">Se connecter / S'inscrire</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
