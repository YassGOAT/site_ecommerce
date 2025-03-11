// src/components/Auth.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    mot_de_passe: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Requête de connexion
      fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          mot_de_passe: formData.mot_de_passe,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage(data.message);
            // Stocke l'utilisateur dans le localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirige vers la page d'accueil
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
          setMessage("Erreur de connexion");
        });
    } else {
      // Requête d'inscription
      fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage(data.message);
            // On peut passer au mode connexion après une inscription réussie
            setIsLogin(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setMessage("Erreur lors de l'inscription");
        });
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Se connecter" : "S'inscrire"}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="mot_de_passe"
          placeholder="Mot de passe"
          value={formData.mot_de_passe}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn auth-btn">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="auth-toggle">
        {isLogin ? (
          <p>
            Vous n'avez pas de compte ?{" "}
            <span onClick={() => setIsLogin(false)} className="toggle-link">
              S'inscrire
            </span>
          </p>
        ) : (
          <p>
            Vous avez déjà un compte ?{" "}
            <span onClick={() => setIsLogin(true)} className="toggle-link">
              Se connecter
            </span>
          </p>
        )}
      </div>
      <Link to="/" className="back-link">Retour à l'accueil</Link>
    </div>
  );
}

export default Auth;
