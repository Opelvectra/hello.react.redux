import * as types from '../constants/actionTypes';

export function initCartItemsIds(cartItemsIds) {
  return function (dispatch) {
    return dispatch({
      type: types.INIT_CART_ITEMS_IDS,
      cartItemsIds
    });
  };
}

export function addCartItemsId(cartItemsId) {
  return function (dispatch) {
    return dispatch({
      type: types.ADD_CART_ITEMS_IDS,
      cartItemsId
    });
  };
}

export function removeCartItemsId(cartItemsId) {
  return function (dispatch) {
    return dispatch({
      type: types.REMOVE_CART_ITEMS_IDS,
      cartItemsId
    });
  };
}
