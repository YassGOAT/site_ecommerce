// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/produit')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Pour cet exemple, on affiche les 4 premiers produits en vedette.
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-container">
      {/* Section Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Bienvenue sur AnimeShop</h1>
          <p>Découvrez notre sélection d'animes et produits dérivés exclusifs.</p>
          <Link to="/produit" className="hero-btn btn">Voir tous les produits</Link>
        </div>
      </section>

      {/* Section Produits en vedette */}
      <section className="featured">
        <h2>Produits en vedette</h2>
        <div className="product-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <div key={product.id_produit} className="product-card">
                <img
                  src={product.image_url || 'https://via.placeholder.com/250x200?text=Produit'}
                  alt={product.nom}
                  className="product-image"
                />
                <h3>{product.nom}</h3>
                <p className="product-price">{product.prix} €</p>
                <Link to={`/product/${product.id_produit}`} className="btn">
                  Voir le détail
                </Link>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
