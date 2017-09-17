import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import products from './productsReducer';
import cartItemsIds from './cartItemsIdsReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  products,
  cartItemsIds,
  routing: routerReducer
});

export default rootReducer;
