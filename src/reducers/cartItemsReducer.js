import * as types from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function cartItemsReducer(state = initialState.cartItems, action) {

  switch (action.type) {
    case types.ADD_CART_ITEM:
      return [...state, action.cartItem];
    case types.REMOVE_CART_ITEM:
      return state.filter(el => el.id !== action.cartItem);
    default:
      return state;
  }
}