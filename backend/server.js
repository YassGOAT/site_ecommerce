const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'siteecommerce'
});

app.get('/', (req, res) => {
    return res.json('From Backend side');
})

app.get('/utilisateur', (req, res) => {
    const sql = 'SELECT * FROM utilisateur';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/produit', (req, res) => {
    const sql = 'SELECT * FROM produit';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/categorie', (req, res) => {
    const sql = 'SELECT * FROM categorie';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log('Listening...');
})