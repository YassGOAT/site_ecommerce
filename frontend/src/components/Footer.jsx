// components/Footer.jsx
import React from 'react';
import './Footer.css'; // Voir ensuite le CSS pour Footer

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} E-Commerce. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;
