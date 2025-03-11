// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'siteecommerce'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la BDD :', err);
    return;
  }
  console.log('Connecté à la BDD, threadId:', db.threadId);
});

// Endpoint de base
app.get('/', (req, res) => {
  res.json('Backend du site e-commerce');
});

// Récupérer tous les utilisateurs
app.get('/utilisateur', (req, res) => {
  const sql = 'SELECT * FROM utilisateur';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// Récupérer tous les produits (attention, endpoint nommé "/produit")
app.get('/produit', (req, res) => {
  const sql = 'SELECT * FROM produit';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// Récupérer toutes les catégories
app.get('/categorie', (req, res) => {
  const sql = 'SELECT * FROM Categorie ORDER BY nom_categorie ASC';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// Récupérer le détail d'un produit, incluant ses avis et la catégorie
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const sqlProduct = `
    SELECT p.*, c.nom_categorie 
    FROM produit p 
    LEFT JOIN categorie c ON p.id_categorie = c.id_categorie 
    WHERE p.id_produit = ?`;
  db.query(sqlProduct, [productId], (err, productResults) => {
    if (err) return res.status(500).json({ error: err });
    if (productResults.length === 0)
      return res.status(404).json({ error: 'Produit non trouvé' });
    
    // Récupération des avis pour le produit
    const sqlAvis = `SELECT * FROM avis WHERE id_produit = ?`;
    db.query(sqlAvis, [productId], (err, avisResults) => {
      if (err) return res.status(500).json({ error: err });
      const product = productResults[0];
      product.avis = avisResults;
      res.json(product);
    });
  });
});

app.listen(8081, () => {
  console.log('Server running on port 8081');
});
