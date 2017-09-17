import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function productsReducer(state = initialState.cartItemsIds, action) {

  switch (action.type) {
    case types.INIT_CART_ITEMS_IDS:
      return [...action.cartItemsIds];
    case types.ADD_CART_ITEMS_IDS:
      return [...state, action.cartItemsId];
    case types.REMOVE_CART_ITEMS_IDS:
      return [...state.filter(function(el){
        console.log('!!>> action.cartItemsId: ' + action.cartItemsId + '; el: ', el);
        return el !== action.cartItemsId;
      })];
    default:
      return state;
  }
}
