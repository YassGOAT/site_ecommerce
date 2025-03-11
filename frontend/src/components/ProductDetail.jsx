// components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="container"><p>Chargement...</p></div>;

  return (
    <div className="container">
      <h1>{product.nom}</h1>
      <img
        src={product.image_url || 'https://via.placeholder.com/250'}
        alt={product.nom}
        className="product-detail-image"
      />
      <p>{product.description}</p>
      <p className="product-price">{product.prix} €</p>
      <p>Catégorie : {product.nom_categorie}</p>
      
      <h2>Avis</h2>
      {product.avis && product.avis.length > 0 ? (
        <ul className="avis-list">
          {product.avis.map(avis => (
            <li key={avis.id_avis}>
              <strong>Note :</strong> {avis.note} – {avis.commentaire}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun avis pour ce produit.</p>
      )}
      <Link to="/" className="btn">Retour aux produits</Link>
    </div>
  );
}

export default ProductDetail;
