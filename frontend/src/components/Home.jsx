// components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Optionnel, sinon les styles de App.css s'appliquent
// Si tu souhaites centraliser tous les styles, tu peux aussi utiliser App.css

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/produit')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Nos Produits</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id_produit} className="product-card">
              <img
                src={product.image_url || 'https://via.placeholder.com/250'}
                alt={product.nom}
                className="product-image"
              />
              <h3>{product.nom}</h3>
              <p className="product-description">{product.description}</p>
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
    </div>
  );
}

export default Home;
