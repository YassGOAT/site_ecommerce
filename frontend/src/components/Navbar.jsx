import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/categorie')
      .then(res => res.json())
      .then(data => {
        // Trie les catégories par ordre alphabétique
        const sorted = data.sort((a, b) => a.nom_categorie.localeCompare(b.nom_categorie));
        setCategories(sorted);
      })
      .catch(err => console.error('Erreur lors de la récupération des catégories :', err));
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="nav-logo">E-Commerce</Link>
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
                  {categories.map(categorie => (
                    <li key={categorie.id_categorie} className="dropdown-item">
                      <Link to={`/categorie/${categorie.id_categorie}`} className="dropdown-link">
                        {categorie.nom_categorie}
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
      </div>
    </header>
  );
}

export default Navbar;
