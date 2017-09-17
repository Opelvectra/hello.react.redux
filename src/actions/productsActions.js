import * as types from '../constants/actionTypes';

export function initProducts(products) {
  return function (dispatch) {
    return dispatch({
      type: types.INIT_PRODUCTS,
      products
    });
  };
}

export function addProducts(product) {
  return function (dispatch) {
    return dispatch({
      type: types.ADD_PRODUCTS,
      product
    });
  };
}

export function removeProducts(productId) {
  return function (dispatch) {
    return dispatch({
      type: types.REMOVE_PRODUCTS,
      productId
    });
  };
}
