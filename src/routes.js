import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import Cart from './components/cart/Cart.js';
import Timeline from './components/timeline/Timeline';
import AboutPage from './components/about/AboutPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Timeline}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="cart" component={Cart}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
