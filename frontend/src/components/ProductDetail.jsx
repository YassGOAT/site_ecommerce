// ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="container">
      <h1>{product.nom}</h1>
      <p>{product.description}</p>
      <p>Prix : {product.prix} €</p>
      <p>Catégorie : {product.nom_categorie}</p>
      
      <h2>Avis</h2>
      {product.avis && product.avis.length > 0 ? (
        <ul>
          {product.avis.map(avis => (
            <li key={avis.id_avis}>
              <strong>Note :</strong> {avis.note} – {avis.commentaire}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun avis pour ce produit.</p>
      )}
      <Link to="/">Retour aux produits</Link>
    </div>
  );
}

export default ProductDetail;
