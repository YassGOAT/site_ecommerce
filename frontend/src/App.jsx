import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'components/Home.jsx';
import ProductDetail from 'components/ProductDetail.jsx';
import Cart from 'components/Cart.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
}

export default App;
