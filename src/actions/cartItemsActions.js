import * as types from '../constants/actionTypes';

export function addCartItem(cartItem) {
  return function (dispatch) {
    return dispatch({
      type: types.ADD_CART_ITEM,
      cartItem
    });
  };
}

export function removeCartItem(cartItemId) {
  return function (dispatch) {
    return dispatch({
      type: types.REMOVE_CART_ITEM,
      cartItemId
    });
  };
}
