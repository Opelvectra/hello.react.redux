import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import cartItems from './cartItemsReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  cartItems,
  routing: routerReducer
});

export default rootReducer;
