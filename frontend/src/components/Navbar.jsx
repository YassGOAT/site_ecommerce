// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupération des catégories
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

    // Vérification de la connexion utilisateur via le localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

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
          {user ? (
            <>
              <span className="nav-user">Bonjour, {user.prenom} {user.nom}</span>
              <button onClick={handleLogout} className="logout-btn">Se déconnecter</button>
            </>
          ) : (
            <Link to="/auth" className="nav-link">Se connecter / S'inscrire</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
