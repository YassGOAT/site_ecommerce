// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Nos produits</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id_produit} className="product-card">
            <h3>{product.nom}</h3>
            <p>{product.description}</p>
            <p>Prix : {product.prix} €</p>
            <Link to={`/product/${product.id_produit}`}>Voir le détail</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
