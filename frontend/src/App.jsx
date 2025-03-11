// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar.jsx';
import Footer from 'components/Footer.jsx';
import Home from 'components/Home.jsx';
import ProductDetail from 'components/ProductDetail.jsx';
import Cart from 'components/Cart.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
