// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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
      <h1>Nos produits</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id_produit} className="product-card">
              <h3>{product.nom}</h3>
              <p>{product.description}</p>
              <p>Prix : {product.prix} €</p>
              <Link to={`/product/${product.id_produit}`}>Voir le détail</Link>
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
