import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function productsReducer(state = initialState.products, action) {

  switch (action.type) {
    case types.INIT_PRODUCTS:
      return [...action.products];
    case types.ADD_PRODUCTS:
      return [...state, action.product];
    case types.REMOVE_PRODUCTS:
      return state.filter(el => el.id !== action.productId);
    default:
      return state;
  }
}
